import jws from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const token = req.cookies["auth"];
    if (!token) {
        return next();
    }
    try {
        const decodedToken = jws.verify(token, process.env.SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        // TODO: Invalid token
        res.clearCookie("auth");
        res.redirect("/auth/login");
    }
};
