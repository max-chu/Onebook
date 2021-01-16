

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json()).use(bodyParser.urlencoded({extended: true}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Running on port " + PORT));