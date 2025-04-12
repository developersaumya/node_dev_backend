const express = require("express");
const app = express();

app.get("/get", (req, res, next) => {
  console.log("Previous");
  next();
});

app.get("/get", (req, res) => {
  res.send("Get data URL");
});

app.get("/user", (req, res) => {
  res.send("User Data");
});

app.listen(8888, function () {
  console.log("Server Running");
});
