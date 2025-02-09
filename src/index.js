import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import routes from "./routes.js";
import showRating from "./helpers/ratingHelper.js";

const app = express();

// db config
try {
    const uri = "mongodb://localhost:27017/movie-magic-js-web-25";
    await mongoose.connect(uri);
    console.log("DB Connected Successfully");
} catch (err) {
    console.log("Cannot connect to DB");
    console.log(err.message);
}

// Handlebars config
app.engine("hbs", handlebars.engine({ extname: "hbs", helpers: { showRating } }));
app.set("view engine", "hbs");
app.set("views", "./src/views");

// Express config
app.use("/static", express.static("src/public"));
app.use(express.urlencoded({ extended: false })); //Learn express to parse form data

app.use(routes);

app.listen(5000, () => {
    console.log("The server is working on http://localhost:5000...");
});
