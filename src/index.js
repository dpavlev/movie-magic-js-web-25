import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("It Works");
});

app.listen(5000, () => {
    console.log("The server is working on http://localhost:5000...");
});
