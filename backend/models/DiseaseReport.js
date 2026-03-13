const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema({
 animalId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Animal"
 },
 image: String,
 predictedDisease: String,
 confidence: Number,
 createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("DiseaseReport", diseaseSchema);