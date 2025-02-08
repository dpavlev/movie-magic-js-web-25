import express from "express";
import handlebars from "express-handlebars";

const app = express();

app.engine("hbs", handlebars.engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", "./src/views");

app.get("/", (req, res) => {
    res.render("home", { layout: false });
});

app.listen(5000, () => {
    console.log("The server is working on http://localhost:5000...");
});
