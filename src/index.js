import express from "express";
import handlebars from "express-handlebars";

import routes from "./routes.js";
import showRating from "./helpers/ratingHelper.js";

const app = express();

app.engine("hbs", handlebars.engine({ extname: "hbs", helpers: { showRating } }));
app.set("view engine", "hbs");
app.set("views", "./src/views");

app.use("/static", express.static("src/public"));
app.use(express.urlencoded({ extended: false })); //Learn express to parse form data

app.use(routes);

app.listen(5000, () => {
    console.log("The server is working on http://localhost:5000...");
});
