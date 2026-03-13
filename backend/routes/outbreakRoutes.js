const express = require("express");
const router = express.Router();

const Disease = require("../models/DiseaseReport");

router.get("/", async(req,res)=>{

try{

const outbreaks = await Disease.find();

res.json(outbreaks);

}catch(err){

res.status(500).json({error:err.message});

}

});

module.exports = router;