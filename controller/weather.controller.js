"use strickt";
const axios = require("axios");
require("dotenv").config({ path: __dirname + "/.env" });
const Forcast = require("../models/forcast.model");

const weather = async (req, res) => {
  const lon = req.query.lon;
  const lat = req.query.lat;
  const q = req.query.q;
  const key = process.env.WEATHER_API_KEY;

  if (lon && lat) {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${key}`;
    const weatherData = await axios.get(url);
    res.json(weatherData.data);
  }
  try {
    if (q) {
      const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${q}&key=${key}`;
      const weatherData = await axios.get(url);
      const refactoredData = weatherData.data.data.map((day) => {
        return new Forcast(
          day.datetime,
          day.high_temp,
          day.low_temp,
          day.weather.description,
          day.weather.icon
        );
      });
      res.json(refactoredData);
    } else {
      res.send("<h1>Error!</h1>");
    }
  } catch (e) {
    console.log("Something went wrong.");
  }
};

module.exports = weather;
