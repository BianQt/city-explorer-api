"use strickt";
const express = require("express");
const cors = require("cors");
const getWeather = require("./controller/weather.controller.js");
const getMovies = require("./controller/movies.controller.js");
require("dotenv").config({ path: __dirname + "/.env" });

const app = express();
const PORT = process.env.PORT;
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/weather", getWeather);
app.get("/movies", getMovies );


app.listen(PORT, () => {
  console.log("Server running on port 3001.");
});
