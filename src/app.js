const express = require('express');
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req,res) => {

    const user = new User({
        firstName : "Manish",
        lastName: "Kumar",
        emailId: "mkmonu68@gmail.com",
        password: "Monu@123"
    });
    await user.save();
    res.send("User added successfully");
});

connectDB().then(() => {
    console.log("Database Connect established");
    app.listen(7777, () =>{
        console.log("Server is sucessfully running on the port 7777...");
    } );
}).catch(err => {
    console.error("Database can not be connected !!!");
});



