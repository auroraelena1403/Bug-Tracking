const express = require("express");
const app=express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bugRoutes = express.Router();
const PORT = 5174;

//user
const User=require("./model");
mongoose.connect("mongodb+srv://twproiect:lHL5vJoFeA1GeZ3B@cluster0.z24httj.mongodb.net/", { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
  });

  bugRoutes.route("/").get(function (req, res) {
    User.find(function (err, users) {
      if (err) {
        console.log(err);
      } else {
        res.json(users);
      }
    });
  });

  app.use("/users", bugRoutes);

  app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
  });

  