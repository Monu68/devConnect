const mongoose = require('mongoose');


const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://mkmonu68:wi8xO3W2eiPsbtZo@devconnects.4rezl.mongodb.net/devConn"
    );
};

module.exports = connectDB;


