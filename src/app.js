const express = require("express");
const app = express();

app.use("/getD",(req,res) => {
    res.send("Get data URL");
});

app.use("/hello",(req,res) => {
    res.send("Hello hello");
});

app.use("/",(req,res) => {
    res.send("Dash");
});

app.listen(8888,function(){
    console.log("Server Running");
});


