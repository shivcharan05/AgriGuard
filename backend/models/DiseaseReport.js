const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema({

diseaseName:String,
animalType:String,
latitude:Number,
longitude:Number,
date:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("DiseaseReport",diseaseSchema);