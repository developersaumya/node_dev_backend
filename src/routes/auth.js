const express = require("express");
const authRouter = express.Router();
const {validateSignUp} = require("../utills/validation.js")
const User = require('../models/user.js');
const bcrypt = require("bcrypt");
authRouter.post("/signup",async (req,res) => {
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
authRouter.post("/login", async (req,res)=>{
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

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    })
    res.send("Logout successfully")
})
module.exports = authRouter