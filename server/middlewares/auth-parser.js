require('dotenv').config({ path: '.env' });

const { google } = require('googleapis');
const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET);


module.exports = (req, res, next) => {
  let auth = req.headers.authorization;
  if (!auth) {
    res.status(400).send({message: "Missing authorization header"});
  } else {
    auth = auth.split(" ");
    if (auth.length !== 2) {
      res.status(400).send({message: "Authorization header should be formatted 'Bearer token'"});
    } else {
      oAuth2Client.setCredentials(auth[1]);

      google.people({version: 'v1', auth: oAuth2Client}).people.get({
        resourceName: "people/me",
        personFields: "emailAddresses"
      }, (err, data) => {
        if (err) res.status(500).send({message: 'Failed to verify authorization and email'});
        else {
          console.log(res.data);
          next();
        }
      });
    }
  }
}