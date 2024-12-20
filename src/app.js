const express = require('express');
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require('./routes/user');

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);








connectDB().then(() => {
    console.log("Database Connect established");
    app.listen(7777, () =>{
        console.log("Server is sucessfully running on the port 7777...");
    } );
}).catch(err => {
    console.error("Database can not be connected !!!");
});



