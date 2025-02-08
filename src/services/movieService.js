import movies from "../movies.js";
import { v4 as uuid } from "uuid";

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

function getAll() {
    return movies;
}

export default {
    getMovie,
    create,
    getAll
};
