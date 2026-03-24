const express = require("express"); 
const cors = require("cors");
const { getRestaurants } = require("./controllers/restaurants.js");
const { handlePathNotFound, handleHTTPErrors } = require("./controllers/errors.js")

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/restaurants", getRestaurants);

app.all("/*path", handlePathNotFound);

app.use(handleHTTPErrors);

module.exports = app;