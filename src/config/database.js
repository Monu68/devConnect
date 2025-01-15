// const mongoose = require('mongoose');


// const connectDB = async () => {
//     await mongoose.connect(
//         "mongodb+srv://mkmonu68:wi8xO3W2eiPsbtZo@devconnects.4rezl.mongodb.net/devConn"
//     );
// };

// module.exports = connectDB;

const mongoose = require("mongoose");

const connectDB = async () => {
  console.log(process.env.DB_CONNECTION_SECRET);
  await mongoose.connect(process.env.DB_CONNECTION_SECRET);
};

module.exports = connectDB;