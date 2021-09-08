"use strickt";
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const data = require("./data/weather.json");
require("dotenv").config({ path: __dirname + "/.env" });

const PORT = process.env.PORT;
const app = express();
app.use(cors());

class Forcast {
  constructor(date,max,min,desc, icon){
    this.date = date;
    this.max = max;
    this.min=min;
    this.desc =desc;
    this.icon = icon;
  }
}
class Movies {
  constructor(tit,img){
    this.tit = tit;
    this.img = img;
  }
}

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
      const refactoredData = weatherData.data.data.map((day)=>{ return new Forcast(day.datetime, day.high_temp,day.low_temp,day.weather.description,day.weather.icon)})
      res.json(refactoredData);
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
      const refactoredData = moviesData.data.results.map((movie)=>{ return new Movies(movie.original_title, movie.poster_path)})
      res.json(refactoredData);
      console.log(refactoredData);
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
