const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/muscial_instrument";

const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("connected to mongo successfully");
    })
    .catch((e) => {
      console.log(e.message);
    });
};

module.exports = connectToMongo;
