const express = require("express");
const authRoutes = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

authRoutes.post("/signup", (req, res) => {
  User.findOne({userName: req.body.userName.toLowerCase()}, (err, user) => {
    if (err) return res.status(500).send(err);
    if (user) return res.status(400).send({err: "username already exists"});
    const newUser = new User(req.body);
    newUser.save(err => {
      if (err) return res.status(500).send(err);
      return res.status(201).send({msg: "Your account has been created.", newUser});
    })
  })
})

authRoutes.post("/login", (req, res) => {
  User.findOne({userName: req.body.userName.toLowerCase()}, (err, user) => {
    if (err) return res.status(500).send(err);
    if (!user) {
      return res.status(403).send({err: "Username or password is incorrect."})
    } else if (user) {
      user.checkPassword(req.body.password, (err, match) => {
        if (err) res.status(403).send(err);
        if (!match) res.status(403).send({err: "Username or password is incorrect."})
        const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
        return res.send({token, user: user.withoutPassword()});
      })
    }

  })
})



module.exports = authRoutes;
