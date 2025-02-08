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

function getAll(filter = {}) {
    let result = movies;
    if (filter.title) {
        result = result.filter((movie) => movie.title.toLowerCase().includes(filter.title.toLowerCase()));
    }
    return result;
}

export default {
    getMovie,
    create,
    getAll
};
