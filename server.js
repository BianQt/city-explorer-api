"use strickt";
const express = require("express");
const cors = require("cors");
const data = require("./data/weather.json");
require('dotenv').config({path: __dirname + '/.env'});

const PORT = process.env.PORT;
const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/weather", (req, res) => {
  console.log(req.query.lon);

  const lon = req.query.lon;
  const lat = req.query.lat;
  const q = req.query.q;

  if ((lon && lat) ) {
    const returnData = data.filter(
      (element) => (element.lat == lat && element.lon == lon) 
    );
    res.json(returnData[0]);
  }
  if (q) {
    const returnData = data.filter(
      (element) => element.city_name.toLowerCase() == q.toLowerCase()
    );
    res.json(returnData[0]);
  } else {
    res.json(data[0]);
  }
  console.log(port);
});


app.listen(PORT, () => {
  console.log("Server running on port 3001.");
});
