const db = require('../db');

// Check whether the username used for sign up has already existed
function verifySignup(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  db.get(
    `SELECT * FROM users WHERE username = "${username}"`,               
    (err, user) => {
      if (user) {
        res.status(400).send({ message: "Username is already in use!"});
      } else {
        next();
      }  
    }
  );
}

module.exports = verifySignup;