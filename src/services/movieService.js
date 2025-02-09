// import movies from "../movies.js";
import { v4 as uuid } from "uuid";
import Movie from "../models/Movie.js";

function getMovie(movieId) {
    const result = movies.find((movie) => movie.id === movieId);
    return result;
}

function create(movieData) {
    const newId = uuid();
    movies.push({
        id: newId,
        ...movieData
    });
}

function getAll(filter = {}) {
    let result = Movie.find({});
    // if (filter.title) {
    //     result = result.filter((movie) => movie.title.toLowerCase().includes(filter.title.toLowerCase()));
    // }
    // if (filter.genre) {
    //     result = result.filter((movie) => movie.genre.toLowerCase() === filter.genre.toLowerCase());
    // }
    // if (filter.year) {
    //     result = result.filter((movie) => movie.year == filter.year);
    // }
    return result;
}

export default {
    getMovie,
    create,
    getAll
};
