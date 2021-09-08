"use strickt";
const axios = require("axios");
require("dotenv").config({ path: __dirname + "/.env" });
const Movies = require("../models/movies.model");

const getMovies = async (req, res) => {
  const q = req.query.q;
  const key = process.env.MOVIES_API_KEY;

  try {
    if (q) {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${q}`;
      const moviesData = await axios.get(url);
      const refactoredData = moviesData.data.results.map((movie) => {
        return new Movies(movie.original_title, movie.poster_path);
      });
      res.json(refactoredData);
    } else {
      res.send("<h1>Error!</h1>");
    }
  } catch (e) {
    console.log("Something went wrong.");
  }
};

module.exports = getMovies;
