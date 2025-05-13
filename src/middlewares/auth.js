const User = require("../models/user");
const jwt = require("jsonwebtoken");
const userAuth =  async (req,res,next) =>{
    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error("No Token Found!!!!");
        }
        const isValidToken = jwt.verify(token,"radha@123");
        if(!isValidToken){
            throw new Error("Token not valid!!!!");
        }
        const {_id} = isValidToken;
        const userData = await User.findOne({_id});
        if(!userData){
            throw new Error("Token not valid!!!!");
        }
        req.user = userData;
        next();
    }
    catch(err){
        res.status(400).send(""+err);
    }
}

module.exports = {userAuth}