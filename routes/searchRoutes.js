const express = require("express");
const searchRoutes = express.Router();
const User = require("../models/user");

searchRoutes.post("/" , (req, res) => {
    User.findOne({firstName: req.body.firstName, lastName: req.body.lastName}, (err, result) => {
        console.log(result);
      if (err) return res.status(500).send(err);
      if (!result) return res.status(403).send({err: "That person isn't in our database"})
      if (result) return res.status(200).send({msg: "Result found", result});
  })
 })

module.exports = searchRoutes
