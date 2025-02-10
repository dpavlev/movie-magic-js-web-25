import Cast from "../models/Cast.js";

function createCast(castData) {
    const result = Cast.create({
        ...castData,
        age: Number(castData.age)
    });
    return result;
}

function getAll() {
    let query = Cast.find({});
    return query;
}

export default {
    createCast,
    getAll
};
