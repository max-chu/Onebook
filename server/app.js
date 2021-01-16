const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const sequelize = require("./sequelize");
const authParser = require("./middlewares/auth-parser");
const { google } = require('googleapis');
const { models } = sequelize;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(morgan("dev"));

app.get("/ping", (req, res) => res.send("pong!"));

app.get("/test", authParser, (req, res) => {
  
});

app.post("/users", authParser, (req, res) => {

});

const PORT = process.env.PORT || 5000;

sequelize.sync(/* {force: true} */).then(() => {
  app.listen(PORT, () => console.log("Running on port " + PORT));
});