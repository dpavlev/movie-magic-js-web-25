import { Router } from "express";
import movieService from "../services/movieService.js";

const router = Router();

router.get("/", (req, res) => {
    res.render("home", movieService.getAll());
});

router.get("/about", (req, res) => {
    res.render("about");
});

export default router;
