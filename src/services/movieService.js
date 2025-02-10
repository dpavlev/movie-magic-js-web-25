import Movie from "../models/Movie.js";

function getMovie(movieId) {
    const result = Movie.findById(movieId).populate("casts");
    return result;
}

function create(movieData) {
    const result = Movie.create({
        ...movieData,
        rating: Number(movieData.rating),
        year: Number(movieData.year)
    });

    return result;
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

async function attachCast(movieId, castId) {
    const movie = await Movie.findById(movieId);
    movie.casts.push(castId);
    await movie.save();
}

export default {
    getMovie,
    create,
    getAll,
    attachCast
};
