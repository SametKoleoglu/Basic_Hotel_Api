const mongoose = require("mongoose");

const db = () => {
  mongoose
    .connect(process.env.DATABASE_URL + process.env.DATABASE_NAME)
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = db;
