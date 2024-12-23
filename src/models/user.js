const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address" + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password" + value);
            }
        }
    },
    age: {
        type: String
    },
    gender: {
        type: String,
        enum: {
            values : ["male", "female", "others"],
            message: `{values} is not a valid gender`
        }
        // validate(value){
        //     if(!["male", "female", "others"].includes(value)){
        //         throw new Error("Gender data is not valid");
        //     }
        // }
       
    },
    photoUrl: {
        type: String,
        default: "https://www.pngall.com/profile-png/download/51602/",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo url" + value);
            }
        }
    },
    about: {
        type: String
    },
    skills: {
        type: [String]
    }
},
    {
        timestamps: true
    }
);

userSchema.methods.getJWT = async function () {

    const user = this;
    const token = await jwt.sign({_id: user._id}, "DEV@CONNECT$65", {expiresIn: "7d"});

    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {

    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

    return isPasswordValid;
}


const User = mongoose.model("User",userSchema);

module.exports = User;