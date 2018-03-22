const express = require("express");
const server = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressJwt = require("express-jwt")
const port = process.env.PORT || 5000;
const axios = require("axios");
const path = require("path");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/user-privelege");
server.use(bodyParser.json());


server.use("/api", expressJwt({secret: process.env.SECRET || 234}));
server.use("/api/user", require("./routes/userRoutes"))
server.use("/auth", require("./routes/authRoutes"));
server.use("/credits", require("./routes/apiRoutes"));
server.use("/search", require("./routes/searchRoutes"));
server.use(express.static(path.join(__dirname, "client", "build")))

server.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})

server.listen(port, ()=>{
  console.log(`Server is running on ${port}`);
})
