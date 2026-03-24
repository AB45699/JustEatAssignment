const express = require("express"); 
const cors = require("cors");
const { getRestaurants } = require("./controllers/restaurants.js");
const { handlePathNotFound, handleHTTPErrors, handleFetchErrors } = require("./controllers/errors.js")

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/restaurants", getRestaurants);

app.all("/*path", handlePathNotFound);

app.use(handleHTTPErrors);

app.use(handleFetchErrors);

module.exports = app;