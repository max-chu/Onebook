const { default: axios } = require("axios");

module.exports = (req, res, next) => {
  if (!req.email) {
    res.status(500).send({message: "No email found"});
  } else {
    axios.get()
  }
}