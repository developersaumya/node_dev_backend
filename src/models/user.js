const mongoose = require("mongoose");

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

module.exports = mongoose.model("User",userSchema);