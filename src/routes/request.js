
const express = require('express');
const  requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest",userAuth, async (req,res) => {
    console.log("Sending a connection resquest");

    res.send("Connection request sent");
})

module.exports = requestRouter;

