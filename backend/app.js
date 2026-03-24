const express = require("express"); 
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/restaurants", (req, res, next) => {
    res.sendStatus(200);
})

module.exports = app;