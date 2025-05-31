const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js")
const requestRouter = require("./routes/request.js")

app.use(express.json());
app.use(cookieParser());
const ISALLOWED = ["lastName","gender"];

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

connectDB().then(()=>{
    console.log("Database connected succesfully!!!");
    app.listen(8888,function(){
        console.log("Server Running");
    })
})
.catch(()=> {
    console.log("Database cannot be connected!!!");
})