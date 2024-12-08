const express = require('express');
const connectDB = require("./config/database");
const User = require("./models/user");


const app = express();

app.use(express.json());

app.post("/signup", async (req,res) => {

    const user = new User(req.body);

    try{
        await user.save();
        res.send("User added successfully");
    }catch(err){
        res.status(400).send("Error saving the user" +err.message);
    }
});

//Get user by emailId

app.get("/user", async (req,res) => {
    const userEmail = req.body.emailId;

    try{
        const user = await User.find({emailId: userEmail});

        res.send(user);
    }
    catch(err){
        res.status(400).send("Something went wrong !!!")
    }
})


//Feed API - GET / feed - get all the user from database.

app.get("/feed", async (req,res) => {
    
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(400).send("Something went wrong !!!")
    }
    
})

//Delete a user from databse
app.delete("/user", async (req,res) => {
    const userId = req.body.userId;

    try{

        //const user = await User.findByIdAndDelete({_id:userId});
        const user = await User.findByIdAndDelete(userId);

        res.send("User deleted successfully");
    }
    catch(err){
        res.status(400).send("Something went wrong !!!")
    }
})

//Update data of a user

app.patch("/user", async (req,res) => {
    const data = req.body;
    const userId = req.body.userId;
    try{
        await User.findByIdAndUpdate({_id: userId}, data, {
            runValidators: true
        });
        
        res.send("User updataed Successfully");
    }
    catch(err){
        res.status(400).send("Something went wrong !!!")
    }
})

connectDB().then(() => {
    console.log("Database Connect established");
    app.listen(7777, () =>{
        console.log("Server is sucessfully running on the port 7777...");
    } );
}).catch(err => {
    console.error("Database can not be connected !!!");
});



