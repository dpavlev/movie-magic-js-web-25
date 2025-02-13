import Movie from "../models/Movie.js";

function getMovie(movieId) {
    const result = Movie.findById(movieId);
    return result;
}
function getMovieWithCast(movieId) {
    const result = Movie.findById(movieId).populate("casts");
    return result;
}

function create(movieData, creatorId) {
    const result = Movie.create({
        ...movieData,
        rating: Number(movieData.rating),
        year: Number(movieData.year),
        creator: creatorId
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

function attachCast(movieId, castId) {
    // *Method #1 with 2 queries
    // const movie = await Movie.findById(movieId);
    // movie.casts.push(castId);
    // await movie.save();
    // *Method #2 with 1 query
    return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } });
}

function deleteMovie(movieId) {
    return Movie.findByIdAndDelete(movieId);
}

function updateMovie(movieId, movieData) {
    return Movie.findByIdAndUpdate(movieId, movieData);
}

export default {
    getMovie,
    getMovieWithCast,
    create,
    getAll,
    attachCast,
    deleteMovie,
    updateMovie
};
