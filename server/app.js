const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const sequelize = require("./sequelize");
const { models } = sequelize;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(morgan("dev"));

app.get("/ping", (req, res) => res.send("pong!"));

app.get("/test", (req, res) => {
  console.log(models);
  models.user.create({email: "test@test.com"}).then(obj => {
    res.send(obj.toJSON());
  });
});

const PORT = process.env.PORT || 5000;

sequelize.sync({force: true}).then(() => {
  app.listen(PORT, () => console.log("Running on port " + PORT));
});