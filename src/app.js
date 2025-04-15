const express = require("express");
const connectDB = require("./config/database.js");
const app = express();

connectDB().then(()=>{
    console.log("Database connected succesfully!!!");
    app.listen(8888,function(){
        console.log("Server Running");
    })
})
.catch(()=> {
    console.log("Database cannot be connected!!!");
})