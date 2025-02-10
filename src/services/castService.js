import Cast from "../models/Cast.js";

function createCast(castData) {
    const result = Cast.create({
        ...castData,
        age: Number(castData.age)
    });
    return result;
}

export default { createCast };
