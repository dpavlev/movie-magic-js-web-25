import { Router } from "express";
import movieService from "../services/movieService.js";

const movieController = Router();

movieController.get("/create", (req, res) => {
    res.render("create");
});

movieController.post("/create", (req, res) => {
    const newMovie = req.body;
    movieService.create(newMovie);
    res.redirect("/");
});

movieController.get("/search", async (req, res) => {
    const filter = req.query;
    const movies = await movieService.getAll(filter).lean();
    res.render("search", { movies, filter });
});

movieController.post("/search", (req, res) => {
    const movies = movieService.getAll();
    res.render("search", { movies });
});

movieController.get("/:movieId/details", async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovie(movieId).lean();
    res.render("details", movie);
});

export default movieController;
