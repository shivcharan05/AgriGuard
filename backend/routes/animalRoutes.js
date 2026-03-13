const express = require("express");
const router = express.Router();

const {
 addAnimal,
 getAnimals,
 deleteAnimal
} = require("../controllers/animalController");

router.post("/", addAnimal);
router.get("/", getAnimals);
router.delete("/:id", deleteAnimal);

module.exports = router;