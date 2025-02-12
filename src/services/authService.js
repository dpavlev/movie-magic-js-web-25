import User from "../models/User.js";

function register(userData) {
    return User.create(userData);
}

export default {
    register
};
