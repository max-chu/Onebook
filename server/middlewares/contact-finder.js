const { default: axios } = require("axios");

module.exports = (req, res, next) => {
  req.toImport = [];
  console.log(req.headers.authorization.split(" ")[1]);
  if (!req.email) {
    res.status(500).send({message: "No email found"});
  } else {
    axios.get(`https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers,biographies&key=${encodeURIComponent(process.env.API_KEY)}&pageSize=1000`, {
      headers: {
        'Authorization': `Bearer ${req.headers.authorization.split(" ")[1]}`
      }
    })
      .then(async response => {
        console.log(response);
        let { nextPageToken } = response.data;
        req.toImport = concatData(req.toImport, response);
        while (nextPageToken) {
          const data = await axios.get(`https://people.googleapis.com/v1/people/me/connections?pageSize=1000&pageToken=${encodeURIComponent(nextPageToken)}&personFields=names,emailAddresses,phoneNumbers&key=${encodeURIComponent(process.env.API_KEY)}`)
          nextPageToken = data.data.nextPageToken;
          req.toImport = concatData(req.toImport, data);
        }
        next();
      });
  }
}

function concatData(old, response) {
  return old.concat(response.data.connections.map(contact => {
    const {familyName, givenName} = contact.names.findPrimary();
    const {type: emailType, value} = contact.emailAddresses.findPrimary();
    const {canonicalForm, type: phoneType} = contact.phoneNumbers.findPrimary();
    const {value: notes} = contact.biographies.findPrimary();
    return {
      first_name: givenName,
      last_name: familyName,
      phoneNumber: {
        phoneType,
        value: canonicalForm,
      },
      email: {
        emailType,
        value,
      },
      notes,
    };
  }));
}

Array.prototype.findPrimary = function() {
  return this.find(obj => obj.metadata.primary);
}