"use strickt";
const axios = require("axios");
require("dotenv").config({ path: __dirname + "/.env" });
const Movies = require("../models/movies.model");
const Cache = require("../helper/cache.helper");

const cacheObject = new Cache();

const getMovies = async (req, res) => {
  const q = req.query.q;
  const key = process.env.MOVIES_API_KEY;

  const foundData = cacheObject.movies.find(
    (movie) => movie.keyWord.includes(q)
  );
  const dayInMilSec = 86400000;
  const timePassed = (Date.now()-cacheObject.timeStamp) > dayInMilSec;
  if (timePassed){
    cacheObject = new Cache();
  }
  if (foundData) {
   
    res.json(foundData);
  } else {

  try {
    if (q) {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${q}`;
      const moviesData = await axios.get(url);
      const refactoredData = moviesData.data.results.map((movie) => {
        cacheObject.movies.push({
          title: movie.original_title,
          imgUrl: movie.poster_path,
          keyWord:q,
        });

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
console.log(cacheObject.movies);
}

module.exports = getMovies;
