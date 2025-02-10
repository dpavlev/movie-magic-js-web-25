import Cast from "../models/Cast.js";

function createCast(castData) {
    const result = Cast.create({
        ...castData,
        age: Number(castData.age)
    });
    return result;
}

function getAll(filter = {}) {
    let query = Cast.find();
    if (filter.exclude) {
        query = query.find({ _id: { $nin: filter.exclude } });
    }
    return query;
}

export default {
    createCast,
    getAll
};
