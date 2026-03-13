const Animal = require("../models/Animal");

exports.addAnimal = async (req,res)=>{

 const animal = await Animal.create(req.body);

 res.json(animal);

};

exports.getAnimals = async(req,res)=>{

 const animals = await Animal.find().populate("owner","name");

 res.json(animals);

};

exports.deleteAnimal = async(req,res)=>{

 await Animal.findByIdAndDelete(req.params.id);

 res.json({message:"Animal deleted"});

};