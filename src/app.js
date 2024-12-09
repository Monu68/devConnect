const express = require('express');
const connectDB = require("./config/database");
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");


const app = express();

app.use(express.json());

app.post("/signup", async (req,res) => {

    // Validation of data
    try{
    validateSignUpData(req);

    const {firstName, lastName, emailId, password}  = req.body;

    //Encrypt the password

    const passwordHash = await bcrypt.hash(password, 10);

    // Creating a new instance of User model

    const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash
    });

    
        await user.save();
        res.send("User added successfully");
    }catch(err){
        res.status(400).send("ERROR : " +err.message);
    }
});

app.post("/login", async (req,res) => {
    try{

        const{emailId,password} = req.body;

        const user = await User.findOne({emailId: emailId});

        if(!user) {
            throw new Error("Invalid credentials !!!");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid){
            res.send("Login successfull");
        }
        else{
            throw new Error("Invalid credentials !!!");
        }

    }catch(err){
        res.status(400).send("ERROR : " +err.message);
    }
})

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

app.patch("/user/:userId", async (req,res) => {
    const userId = req.params?.userId;
    const data = req.body;

    try{

        const ALLOWED_UPDATES = ["photoUrl","about","gender","age","skills"];

        const isUpdateAllowed = Object.keys(data).every((k) => 
            ALLOWED_UPDATES.includes(k)
        );
        if(!isUpdateAllowed)
        {
            throw new Error("Update not allowed");
        }

        if(data?.skills.length > 10)
        {
            throw new error("Skills cannot be more than 10");
        }
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



