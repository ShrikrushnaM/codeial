const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/codial_development");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to mongoDB"));

db.once("open", function () {
  console.log("connected Successfully");
});

module.exports = db;
