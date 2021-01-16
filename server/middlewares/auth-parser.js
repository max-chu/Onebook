module.exports = (req, res, next) => {
  let auth = req.headers.authorization;
  if (!auth) {
    res.status(401).send({message: "Missing authorization header"});
  } else {
    
  }
}