const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../db");

exports.signup = (req, res, next) => {
  const username = req.body.username;
  const password = bcrypt.hashSync(req.body.password, 8);
  const sql = "INSERT INTO users(username, password) VALUES(?, ?)";
  db.get(sql, [username, password], (err, row) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: "Server error"});
    } else {
      next();
    }
  })
};

exports.signin = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const sql = "SELECT * FROM users WHERE username = ?";
  db.get(sql, req.body.username, (err, user) => {
    if (err) {
      res.status(500).send({ message: err.message });
      return;
    }

    if (!user) {
      return res.status(404).send({ 
        message: "User Not found - Please register!" 
      });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    const token = jwt.sign({ id: user.id }, "secret");

    res.status(200).send({
      id: user.id,
      username: user.username,
      accessToken: token
    });
  });
};