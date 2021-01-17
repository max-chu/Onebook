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

const sendContact = (req, res) => {
  models.friendship.findOne({
    where: {id: req.params.friendshipId},
    include: [models.link, models.phonenum, models.address, models.tag,],
  })
    .then(doc => {
      console.log(doc);
      res.send(doc.toJSON());
    })
    .catch(err => {
      console.log(err);
    })
}

const sendContacts = (req, res) => {
  models.friendship.findAll({
    where: {userId: req.user.id},
    // include: [models.link, models.phonenum, models.address, models.tag,],
  })
    .then(docs => {
      docs = docs.map(doc => doc.toJSON());
      console.log(docs);
      res.send(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({message: "Failed to query"});
    });
}

app.post("/me/contacts", contactFinder, (req, res, next) => {
  Promise.all(req.toImport.map(async ({phoneNumber, first_name, last_name, email, notes}) => {
    const {id: friendshipId} = await models.friendship.create({
      userId: req.user.id,
      first_name,
      last_name,
      notes
    });

    await Promise.all([
      email && models.link.create({
        friendshipId,
        platform: 'gmail',
        username: email.value,
      }),
      phoneNumber && models.phonenum.create({
        friendshipId,
        phone_num: phoneNumber.value
      })
    ])
  }))
    .then(docs => {
      next();
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({message: "Failed to insert"});
    });
}, sendContacts);

const insertFriend = async ({phoneNumber, first_name, last_name, email, notes}) => {
  const {id: friendshipId} = await models.friendship.create({
    userId: req.user.id,
    first_name,
    last_name,
    notes
  });

  await Promise.all([
    email && models.link.create({
      friendshipId,
      platform: 'gmail',
      username: email.value,
    }),
    phoneNumber && models.phonenum.create({
      friendshipId,
      phone_num: phoneNumber.value
    })
  ])
};

const updateParser = 

app.post("/me/friendships", (req, res) => {
  const {firstName, lastName, email, notes, phoneNumber, }
  insertFriend({req.})
})

app.get("/me/friendships", sendContacts);

app.get('/me/friendships/:friendshipId', sendContact);
app.put('/me/friendships/:friendshipId', sendContact);
app.delete('/me/friendships/:friendshipId', )

/* query params: 
field - friendship, tag, link, relation, link, phonenum, address
type 
*/
app.put('/me/friendships/:friendshipId')

app.get("/me", (req, res) => res.send(req.user.toJSON()));

const PORT = process.env.PORT || 5000;

sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => console.log("Running on port " + PORT));
}).catch(() => console.log("hello"));