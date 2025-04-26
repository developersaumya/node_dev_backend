const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require('./models/user.js');
const {validateSignUp} = require('./utills/validation.js')
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
 const {userAuth} = require("./middlewares/auth.js");


app.use(express.json());
app.use(cookieParser());
const ISALLOWED = ["lastName","gender"];

// SIGN UP USER
app.post("/signup",async (req,res) => {
    try{
        const data = req.body;
        validateSignUp(data);
        const {firstName,lastName,emailId,password,age,gender} = data;
        const passwordHash = await bcrypt.hash(password,10);
        const user = new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash,
            age,
            gender
        });
        const p = await user.save();
        res.send("User Added Successfully!");
    }
    catch(e)
    {
        res.status(400).send("Error: " +e.message)
    }
})

// LOGIN USER
app.post("/login", async (req,res)=>{
    try{
        const {emailId,password} = req.body;
        const user = await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Credential not valid!!");
        }       
        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){
            const token = await user.getJWT();
            res.cookie("token",token);
            res.send("Logged In Successful!");
        }
        else{   
          throw new Error("Password Credential not valid!!");
        }
    }
    catch(e)
    {
        res.status(400).send(" "+e)
    }
})

// Update User By ID
app.patch("/user/:id", async(req, res) =>{
    const id = req.params.id;
    const data = req.body;
    try{
        const updateAllowed = Object.keys(data).every((key)=>{
           return ISALLOWED.includes(key);
        })
        if(!updateAllowed){
            throw new Error("Update not allowed");
        }
       await User.findByIdAndUpdate({_id:req.params.id},data);
       res.send("User updated SuccessFully");
    }
    catch(e)
    {
       res.status(400).send(e.message);
    }    
})

// Fetch all USER
app.get("/feed",userAuth,async (req,res)=>{
   try{
        const users = await User.find({});
        res.send(users);
   }catch(e)
   {
        console.log(e.message);
   }
})

// Fetch User by Email
app.get("/userByEmail", async(req,res) => {
    try{
        const user =  await User.find({emailId:"sa11123@gmail.com"})
        console.log(user);
        res.send(user);
    }
    catch(e)
    {
        res.send("Not able to fetch Data");
    }
})

//Get Profile by Token
app.get('/profile',userAuth,async (req,res) => {
    try{
        const profileData = req.user;
        res.send(profileData);
    }
    catch(e){
        res.status(400).send(" "+e.message);
    }
})

// Delete User By Id
app.delete("/user/:id", async (req, res) => {
    try{
        const id = req.params.id;
       const result = await User.findByIdAndDelete(id);
       console.log(result);
        res.send("Succesfully");
    }
    catch(e){
        res.status(400).send("Not able to delete "+e.message);
    }
    
})

connectDB().then(()=>{
    console.log("Database connected succesfully!!!");
    app.listen(8888,function(){
        console.log("Server Running");
    })
})
.catch(()=> {
    console.log("Database cannot be connected!!!");
})