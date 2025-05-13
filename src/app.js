const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require('./models/user.js');
const {validateSignUp} = require('./utills/validation.js')
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth.js");
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js")

app.use(express.json());
app.use(cookieParser());
const ISALLOWED = ["lastName","gender"];

app.use("/",authRouter);
app.use("/",profileRouter);

connectDB().then(()=>{
    console.log("Database connected succesfully!!!");
    app.listen(8888,function(){
        console.log("Server Running");
    })
})
.catch(()=> {
    console.log("Database cannot be connected!!!");
})