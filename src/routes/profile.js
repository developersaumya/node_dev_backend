const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");

//Profile
profileRouter.get('/profile',userAuth,async (req,res) => {
    try{
        const profileData = req.user;
        res.send(profileData);
    }catch(e){
        res.status(400).send(" "+e.message);
    }
})

//UpdateProfile

profileRouter.patch("/profile")

module.exports = profileRouter