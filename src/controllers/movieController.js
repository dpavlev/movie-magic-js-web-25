import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const movieController = Router();

movieController.get("/create", isAuth, (req, res) => {
    res.render("create");
});

movieController.post("/create", isAuth, async (req, res) => {
    const newMovie = req.body;
    const userId = req.user?.id;
    await movieService.create(newMovie, userId);
    res.redirect("/");
});

movieController.get("/search", async (req, res) => {
    const filter = req.query;
    const movies = await movieService.getAll(filter).lean();
    res.render("search", { movies, filter });
});

movieController.get("/:movieId/details", async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovieWithCast(movieId).lean();
    const isCreator = movie.creator?.equals(req.user?.id);
    res.render("movies/details", { movie, isCreator });
});

movieController.get("/:movieId/attach-cast", isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovie(movieId).lean();
    const casts = await castService.getAll({ exclude: movie.casts }).lean();
    res.render("casts/cast-attach", { movie, casts });
});

movieController.post("/:movieId/attach-cast", isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;
    await movieService.attachCast(movieId, castId);

    res.redirect(`/movies/${movieId}/details`);
});

movieController.get("/:movieId/delete", isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovie(movieId).lean();
    if (!movie.creator?.equals(req.user?.id)) {
        return res.redirect("/404");
    }
    await movieService.deleteMovie(movieId);
    res.redirect("/");
});

movieController.get("/:movieId/edit", isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovie(movieId).lean();
    const categories = getCategoriesViewData(movie.category);
    res.render("movies/edit", { movie, categories });
});

movieController.post("/:movieId/edit", isAuth, async (req, res) => {
    const movieData = req.body;
    const movieId = req.params.movieId;
    // TODO: check if creator
    await movieService.updateMovie(movieId, movieData);
    res.redirect(`/movies/${movieId}/details`);
});

function getCategoriesViewData(category) {
    const categoriesMap = {
        "tv-show": "TV Show",
        animation: "Animation",
        movie: "Movie",
        documentary: "Documentary",
        "short-film": "Short Film"
    };

    const categories = Object.keys(categoriesMap).map((value) => ({
        value,
        label: categoriesMap[value],
        selected: value === category ? "selected" : ""
    }));

    return categories;
}

export default movieController;
