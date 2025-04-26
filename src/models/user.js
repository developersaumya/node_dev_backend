const mongoose = require("mongoose");
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
    },
    emailId: {
            type:String,  
    },
    password:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value.toLowerCase()))
            {
                throw new Error("Gender not valid");

            }
        }
    },
},
{
    timestamps:true
}
);

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id},"radha@123");
    return token;
}

userSchema.methods.validatePassword = async function(passwordByUser){
    const user = this;
    const isPasswordValid = await bcrypt.compare(passwordByUser,user.password);
    return isPasswordValid;
}

module.exports = mongoose.model("User",userSchema);