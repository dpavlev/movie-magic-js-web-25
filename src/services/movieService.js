// import movies from "../movies.js";
import Movie from "../models/Movie.js";

function getMovie(movieId) {
    const result = Movie.findById(movieId);

    return result;
}

function create(movieData) {
    movies.push({
        id: newId,
        ...movieData
    });
}

function getAll(filter = {}) {
    let query = Movie.find({});
    if (filter.title) {
        // TODO: use case insensitive search
        query = query.find({ title: filter.title });
    }
    if (filter.genre) {
        // TODO: use case insensitive search
        query = query.find({ genre: filter.genre });
    }
    if (filter.year) {
        query = query.find({ year: Number(filter.year) });
    }
    return query;
}

export default {
    getMovie,
    create,
    getAll
};
