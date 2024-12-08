const mongoose = require('mongoose');

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
        trim : true
    },
    password: {
        type: String,
        required: true
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
        default: "https://www.pngall.com/profile-png/download/51602/"
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