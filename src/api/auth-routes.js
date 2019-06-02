//Express:
const express = require("express");
const router = express.Router();

//Services:
const AuthService = require("../services/auth-service");
const authService = new AuthService();

//Models:
//const users = require('../utilities/models/users');

router.post("/register", (req, res) => {
  authService
    .register(req.body)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(400).json({ msg: err.message });
    });
});

router.post("/login", (req, res) => {
  authService
    .login(req.body)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(400).json({ msg: err.message });
    });
});

module.exports = router;
