const express = require("express");
const apiRoutes = express.Router();
const axios = require("axios")

apiRoutes.route("/")
  .post((req, res) => {
    axios.get(req.body.url).then(response => {
      return res.send(response.data)
    })
  })

apiRoutes.route("/actor")
  .post((req, res) => {
    axios.get(`https://api.themoviedb.org/3/person/${req.body.id}/movie_credits?api_key=c9fd5be9c253f4a547b51618774afe1a&language=en-US`).then(response => {
      return res.send(response.data)
    })
  })

module.exports = apiRoutes;
