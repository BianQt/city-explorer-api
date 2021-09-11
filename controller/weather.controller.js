"use strickt";
const axios = require("axios");
require("dotenv").config({ path: __dirname + "/.env" });
const Forcast = require("../models/forcast.model");
const Cache = require("../helper/cache.helper");

const cacheObject = new Cache();

const weather = async (req, res) => {
  const lon = req.query.lon;
  const lat = req.query.lat;
  const q = req.query.q;
  const key = process.env.WEATHER_API_KEY;

  const foundData = cacheObject.forcast.find(
    (location) => location.lat == lat && location.lon == lon
  );
  const dayInMilSec = 86400000;
  const timePassed = Date.now() - cacheObject.timeStamp > dayInMilSec;
  if (timePassed) {
    cacheObject = new Cache();
  }
  if (foundData) {
    res.json(foundData.data);
  } else {
    try {
      const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${key}`;
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
      cacheObject.forcast.push({
        lat: lat,
        lon: lon,
        data: refactoredData,
      });
      res.json(refactoredData);
    } catch (e) {
      console.log("Something went wrong.");
    }
  }
};

module.exports = weather;
