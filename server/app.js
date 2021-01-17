const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const sequelize = require("./sequelize");
const authParser = require("./middlewares/auth-parser");
const { google } = require('googleapis');
const contactFinder = require("./middlewares/contact-finder");
const userFinder = require("./middlewares/user-finder");
const { models } = sequelize;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(morgan("dev"));
app.use(authParser, userFinder);

app.get("/ping", (req, res) => res.send("pong!"));

app.get("/test", (req, res) => {
  res.send(req.user);
});

app.post("/contacts", contactFinder, (req, res) => {
  Promise.all(req.toImport.map(obj => Promise.all([
    models.
  ])))
    .then(docs => {

    })
    .catch(err => {
      req.status(500).send({message: "Failed to insert"});
    })
});

app.post("/me/friendships")

app.get("/me/friendships")

app.post('/me/friendships/:friendshipId')

/* query params: 
field - friendship, tag, link, relation, link, phonenum, address
type 
*/
app.put('/me/friendships/:friendshipId')

app.post("/me", (req, res) => {
  models.user.findOrCreate({where: {email: req.email}})
    .then(doc => {
      res.send(doc[0].toJSON());
    })
    .catch(err => {
      res.status(500).send({message: "Failed to insert"});
    });
});

const PORT = process.env.PORT || 5000;

sequelize.sync(/* {force: true} */).then(() => {
  app.listen(PORT, () => console.log("Running on port " + PORT));
});