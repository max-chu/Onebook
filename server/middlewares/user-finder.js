const sequelize = require("../sequelize");

module.exports = (req, res, next) => {
  if (!req.email) {
    res.status(500).send({message: "No email"});
  } else {
    sequelize.models.user.findOrCreate({where: {email: req.email}})
    .then(doc => {
      req.user = doc[0];
      next();
    })
    .catch(err => {
      res.status(500).send({message: "Failed to insert"});
    });
  }
}