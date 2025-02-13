import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";

const movieController = Router();

movieController.get("/create", (req, res) => {
    res.render("create");
});

movieController.post("/create", async (req, res) => {
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

movieController.get("/:movieId/attach-cast", async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovie(movieId).lean();
    const casts = await castService.getAll({ exclude: movie.casts }).lean();
    res.render("casts/cast-attach", { movie, casts });
});

movieController.post("/:movieId/attach-cast", async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;
    await movieService.attachCast(movieId, castId);

    res.redirect(`/movies/${movieId}/details`);
});

movieController.get("/:movieId/delete", async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovie(movieId).lean();
    if (!movie.creator?.equals(req.user?.id)) {
        return res.redirect("/404");
    }
    await movieService.deleteMovie(movieId);
    res.redirect("/");
});

movieController.get("/:movieId/edit", async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovie(movieId).lean();
    res.render("movies/edit", { movie });
});

export default movieController;
