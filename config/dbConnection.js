const mongoose = require("mongoose");

const connectDb = () =>
  mongoose
    .connect("mongodb://localhost:27017/mycontacts-backend")
    .then((res) => {
      console.log("connected successfully");
    })
    .catch((err) => {
      console.log(err, "not connected");
    });

module.exports = connectDb;
