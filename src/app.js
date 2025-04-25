const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require('./models/user.js');

app.use(express.json());
const ISALLOWED = ["lastName","gender"];

// SIGN UP USER
app.post("/signup",async (req,res) => {
    try{
        const data = req.body;
        const user = new User(data);
        const p = await user.save();
        res.send("User Added Successfully!");
    }
    catch(e)
    {
        res.status(400).send("Error While adding Data"+e.message)
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
app.get("/feed",async (req,res)=>{
   try{
        const users = await User.find({});
        res.send(users);
   }
   catch(e)
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