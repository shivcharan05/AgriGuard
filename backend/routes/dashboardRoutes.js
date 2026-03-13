const express = require("express");
const router = express.Router();

const Animal = require("../models/Animal");
const Disease = require("../models/DiseaseReport");

router.get("/", async (req,res)=>{

try{

const animals = await Animal.find();
const diseases = await Disease.find();

const cow = animals.filter(a=>a.type==="cow").length;
const buffalo = animals.filter(a=>a.type==="buffalo").length;
const goat = animals.filter(a=>a.type==="goat").length;

const vaccinated = animals.filter(a=>a.vaccinated===true).length;
const notVaccinated = animals.filter(a=>a.vaccinated===false).length;

const threshold = 5;

res.json({

animals:{
cow,
buffalo,
goat
},

vaccination:{
vaccinated,
notVaccinated
},

diseaseCases:diseases.length,

alert:diseases.length>threshold

});

}catch(err){

res.status(500).json({error:err.message});

}

});

module.exports = router;