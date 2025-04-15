const mongoose = require("mongoose");

const connectDB = async () => {mongoose.connect("mongodb+srv://developersaumya:Ic2xStagJA3Rz04W@cluster0.jxs8du5.mongodb.net/");
};

module.exports = connectDB;

connectDB().then(()=> {
    console.log("Connection Established...");
}).catch((err) => {
    console.log("Cannot connected!!");
});
