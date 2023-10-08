const mongoose = require("mongoose");

// const { MONGO_URI } = process.env;
const MONGO_URI= "mongodb+srv://VSaiTeja:VSaiTeja@cluster0.gb2rwlo.mongodb.net/eventmanagement?retryWrites=true&w=majority"


exports.connect = () => {
    console.log(MONGO_URI)
  // Connecting to the database
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};