const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  title: String,
  price: Number,
  city: String,
  address: String,
  image: String,
  description: String,
  ownerId: String,
});

module.exports = mongoose.model("House", houseSchema);