const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
 name: String,
 type: String,
 breed: String,
 age: Number,
 healthStatus: String,
 vaccinated:Boolean,
 owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
 }
});

module.exports = mongoose.model("Animal", animalSchema);