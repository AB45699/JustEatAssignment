const express = require("express"); 
const cors = require("cors");
const { getRestaurants } = require("./controllers/restaurants.js");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/restaurants", getRestaurants)

module.exports = app;