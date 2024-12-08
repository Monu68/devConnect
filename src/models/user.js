const mongoose = require('mongoose');
const validator = require('validator');

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
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
       
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


const User = mongoose.model("User",userSchema);

module.exports = User;