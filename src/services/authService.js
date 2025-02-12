import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function register(userData) {
    return User.create(userData);
}

async function login(email, password) {
    const user = await User.findOne({ email });
    const isValid = bcrypt.compare(password, user.password);

    if (!isValid || !user) {
        throw new Error("Invalid email or password");
    }

    const payload = {
        id: user.id,
        email: user.email
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "2h" });
    return token;
}

export default {
    register,
    login
};
