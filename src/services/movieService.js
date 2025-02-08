import movies from "../movies.js";

function getMovie(movieId) {
    const result = movies.find((movie) => movie.id === movieId);
    return result;
}

export default {
    getMovie
};
