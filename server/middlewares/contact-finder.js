const { default: axios } = require("axios");

module.exports = (req, res, next) => {
  req.toImport = [];
  if (!req.email) {
    res.status(500).send({message: "No email found"});
  } else {
    axios.get(`https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers,biographies&key=${encodeURIComponent(process.env.API_KEY)}&pageSize=1000`, {
      headers: {
        'Authorization': `Bearer ${req.headers.authorization.split(" ")[1]}`
      }
    })
      .then(async response => {
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
    let nfamilyName = undefined;
    let ngivenName = undefined;
    let nemailType = undefined;
    let nvalue = undefined;
    let ncanonicalForm = undefined;
    let nphoneType = undefined;
    let nnotes = undefined;

    if(contact.names){
      const {familyName, givenName} = contact.names.findPrimary();
      nfamilyName=familyName;
      ngivenName = givenName;
    }
    if(contact.emailAddresses){
      const {type: emailType, value} = contact.emailAddresses.findPrimary();
      nemailType = emailType;
      nvalue = value;
    }
    if(contact.phoneNumbers){
      const {canonicalForm, type: phoneType} = contact.phoneNumbers.findPrimary();
      ncanonicalForm = canonicalForm;
      nphoneType = phoneType;
    }
    if(contact.biographies){
      const {value: notes} = contact.biographies.findPrimary();
      nnotes = notes;
    }
    return {
      first_name: ngivenName,
      last_name: nfamilyName,
      phoneNumber: {
        nphoneType,
        value: ncanonicalForm,
      },
      email: {
        nemailType,
        nvalue,
      },
      nnotes,
    };
  }));
}

Array.prototype.findPrimary = function() {
  return this.find(obj => obj.metadata.primary);
}