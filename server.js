"use strickt";
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const data = require("./data/weather.json");
require("dotenv").config({ path: __dirname + "/.env" });

const PORT = process.env.PORT;
const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/weather", async (req, res) => {
  const lon = req.query.lon;
  const lat = req.query.lat;
  const q = req.query.q;
  const key = process.env.WEATHER_API_KEY;

  if (lon && lat) {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${key}`;
    const weatherData = await axios.get(url);
    res.json(weatherData.data);
    console.log(weatherData);
  }
  try {
    if (q) {
      const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${q}&key=${key}`;
      const weatherData = await axios.get(url);
      res.json(weatherData.data);
      console.log(weatherData);
    } else {
      res.send("<h1>Error!</h1>");
    }
  } catch (e) {
    console.log("Something went wrong.");
  }
});



app.get("/movies", async (req, res) => {
const q = req.query.q;
  const key = process.env.MOVIES_API_KEY;

  try {
    if (q) {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${q}`;
      const moviesData = await axios.get(url);
      res.json(moviesData.data.results);
      console.log(moviesData.data);
    } else {
      res.send("<h1>Error!</h1>");
    }
  } catch (e) {
    console.log("Something went wrong.");
  }
});



app.listen(PORT, () => {
  console.log("Server running on port 3001.");
});
