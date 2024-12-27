
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req,res,next) =>{

    //Read the token from the req cookie
    try{
        const {token} = req.cookies;
        if(!token){
            return res.status(401).send("Please Login");
        }
        const decodedObj = await jwt.verify(token, "DEV@CONNECT$65");

        const{_id} = decodedObj;

        const user = await User.findById(_id);
        if(!user)
        {
            throw new Error("User not found");
        }

        req.user = user;
        next();

    }catch(err){
            res.status(400).send("ERROR : " +err.message);
        }

    //Validation the token

    //find the user
}

module.exports = {
    userAuth
}