const express = require("express");
const cors = require('cors');
const path = require("path");
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
app.use("/me", authParser, userFinder);
app.use(express.static(path.join(__dirname, 'public')));

app.get("/ping", (req, res) => res.send("pong!"));

app.get("/test", (req, res) => {
  res.send(req.user);
});

const sendContact = (req, res) => {
  const {friendship} = req;
  console.log(friendship);

  models.friendship.findOne({
    where: {id: friendship.id},
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
    include: models.tag,
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

app.post("/me/friendships", (req, res, next) => {
  const {first_name, last_name, birthday, company, location, avatar_url, notes, links = [], phoneNumber, tags = [],} = req.body;

  models.friendship.create({
    first_name,
    last_name,
    avatar_url,
    notes,
    birthday,
    company,
    location,
  })
    .then((friendship) => {
      const {id: friendshipId} = friendship; 
      const saveSocials = links.map(({platform, username}) => {
        models.link.create({platform, username, friendshipId})
          .then(doc => {
            doc.username = username;
            return doc.save();
          })
          .catch(err => {
            console.log(err);
            res.status(500).send({message: "failed to query/update"});
          });
      });
    
      models.tag.findAll({where: {friendshipId}})
        .then(docs => {
          Promise.all(docs.map(docu => docu.destroy()))
            .then(() => {
              const saveTags = Promise.all(tags.map(tag => {
                return model.tag.create({tag_name: tag, friendshipId});
              }))
              
              const savePhonenum = phoneNumber && new Promise((resolve) => {
                models.phonenum.find({friendshipId, phone_num, phoneNumber}).then(([phoneNum, created]) => {
                  if (!created) {
                    phoneNum.phone_num = phoneNumber;
                    phoneNum.save()
                      .then(() => {
                        resolve();
                      });
                  } else {
                    resolve();
                  }
                });
              })
    
              Promise.all([
                saveSocials,
                saveTags,
                savePhonenum,
              ])
                .then(() => {
                  req.friendship = friendship;
                  next();
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).send({message: "server failed"});
                })
            })
            .catch((err) => {
              console.log(err);
              res.status(500).send();
            });
        })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send();
    });
}, sendContact);

app.get("/me/friendships", sendContacts);

app.param("friendshipId", (req, res, next) => {
  model.friendship.findOne({where: {id: req.params.friendshipId}})
    .then(doc => {
      req.friendship = doc;
      next();
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({message: 'failed to query'});
    });
});

app.get('/me/friendships/:friendshipId', sendContact);

app.put('/me/friendships/:friendshipId', (req, res, next) => {
  const {first_name, last_name, birthday, company, location, avatar, notes, links, phoneNumber, tags,} = req.body;

  req.friendship.first_name = first_name;
  req.friendship.last_name = last_name;
  req.friendship.avatar_url = avatar;
  req.friendship.notes = notes;
  req.friendship.birthday = birthday;
  req.friendship.company = company;
  req.friendship.location = location;
  const saveFriendship = req.friendship.save();

  const saveSocials = links.map(({platform, username}) => {
    return models.link.upsert({platform, username});
  });

  models.tag.findAll({where: {friendshipId: req.params.friendshipId}})
    .then(docs => {
      Promise.all(docs.map(docu => docu.destroy()))
        .then(() => {
          const saveTags = Promise.all(tags.map(tag => {
            return model.tag.create({tag_name: tag, friendshipId: req.params.friendshipId});
          }))
          
          const savePhonenum = new Promise((resolve) => {
            models.phonenum.findOrCreate({where: {friendshipId}}).then(([phoneNum, created]) => {
              if (!created) {
                phoneNum.phone_num = phoneNumber;
                phoneNum.save()
                  .then(() => {
                    resolve();
                  });
              } else {
                resolve();
              }
            });
          })

          Promise.all([
            saveFriendship,
            saveSocials,
            saveTags,
            savePhonenum,
          ])
            .then(() => {
              next();
            })
            .catch(err => {
              console.log(err);
              res.status(500).send({message: "server failed"});
            })
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send();
        });
    });
  
}, sendContact);

app.delete('/me/friendships/:friendshipId', (req, res) => {
  req.friendship.destroy()
    .then(() => {
      res.send();
    })
    .catch(err => {
      res.status(500).send({message: "failed to delete"});

  });
});

app.get("/me", (req, res) => res.send(req.user.toJSON()));

const PORT = process.env.PORT || 5000;

sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => console.log("Running on port " + PORT));
});