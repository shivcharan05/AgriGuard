const mongoose = require("mongoose");

const vaccinationSchema = new mongoose.Schema({
 animalId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Animal"
 },
 vaccineName: String,
 date: Date,
 nextDue: Date
});

module.exports = mongoose.model("Vaccination", vaccinationSchema);