const express = require('express');
const userRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = "firstName, lastName, photoUrl, age, about, skills";

userRouter.get("/user/requests/received", userAuth , async (req,res) =>{
    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", ["firstName", "lastName", "photoUrl", "age", "about", "skills"])

        res.json({
            message: "Data fetched successfully",
            data: connectionRequest
        })


    }catch(err){
        request.status(400).send("Error" +err.message);
    }
})

userRouter.get("/user/connections", userAuth , async (req,res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or:[
                {toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"}
            ]
        })
        .populate("fromUserId", ["firstName", "lastName", "photoUrl", "age", "about", "skills"])
        .populate("toUserId", ["firstName", "lastName", "photoUrl", "age", "about", "skills"]);

        const data = connectionRequests.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        })

        res.json({data});
    }catch(err){
        res.status(400).send({message: err.message});
    }


})

userRouter.get("/feed", userAuth , async (req,res) =>{
    try{
        const loggedInUser = req.user;

        const page = parseInt(req.query.page)
        let limit = parseInt(req.query.limit)
        limit = limit > 50 ? 50 : limit;
        const skip = (page-1)*limit;

        console.log("Logged-in user ID:", loggedInUser._id);

        // Find all connection requests (sent + received)
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {fromUserId: loggedInUser._id},
                {toUserId: loggedInUser._id}
            ]
        }).select("fromUserId toUserId");

        console.log("Connection Requests:", connectionRequests);

        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((req) =>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString())
        })

        const users = await User.find({
            $and: [
                { _id: {$nin: Array.from(hideUsersFromFeed)}},
                { _id: {$ne: loggedInUser._id}}
            ],
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);

        res.send(users);

    }catch(err){
        res.status(400).json({message: err.message})
    }
})


module.exports = userRouter;