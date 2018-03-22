const express = require("express");
const userRoutes = express.Router();
const User = require("../models/user");

userRoutes.route("/")
  .get((req, res) => {
    User.find((err, users) => {
      if (err) return res.status(500).send(err);
      res.send(users);
    })
  })
  .post((req, res) => {
    let newUser = new User(req.body);
    newUser.save((err, user) => {
      if (err) return res.status(500).send(err);
      res.status(201).send(user);
    })
  })

userRoutes.route("/persist")
  .post((req, res) => {
    User.findById(req.user._id, (err, user) => {
      if(err) return res.status(500).send(err);
      res.status(200).send(user)
    })
  })

userRoutes.route("/:id")
  .delete((req, res) => {
    User.findOneAndRemove({_id: req.params.id}, (err, user) => {
      if (err) return res.status(500).send(err);
      res.send({message: "Profile has been removed", user});
    })
  })
.put((req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
    if(err) res.status(500).send(err);
    let updatedUser = Object.assign(user, req.body);
    updatedUser.save((err, user) => {
      if (err) return res.status(500).send(err);
      res.send(user);
    })
  })
})

module.exports = userRoutes;
