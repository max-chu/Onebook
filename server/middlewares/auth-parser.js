require('dotenv').config({ path: '.env' });

const { default: axios } = require('axios');

module.exports = (req, res, next) => {
  let auth = req.headers.authorization;

  if (!auth) {
    res.status(400).send({message: "Missing authorization header"});
  } else {
    auth = auth.split(" ");
    if (auth.length !== 2) {
      res.status(400).send({message: "Authorization header should be formatted 'Bearer token'"});
    } else {
      axios.get(`https://people.googleapis.com/v1/people/me?personFields=emailAddresses&key=${encodeURIComponent(process.env.API_KEY)}`, {
        headers: {
          'Authorization': `Bearer ${auth[1]}`,
        }
      })
        .then(response => {
          const { value } = response.data.emailAddresses.find(email => email.metadata.primary);
          if (value) {
            req.email = value;
            next();
          } else {
            res.status(500).send({message: "Could not find primary email"});
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).send({message: "Failed to query google api"});
        });
    }
  }
}