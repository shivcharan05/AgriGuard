const express = require("express");
const router = express.Router();
const multer = require("multer");

const { detectAnimal, detectDisease } = require("../controllers/aiController");

const upload = multer({ dest: "uploads/" });

router.post("/detect", upload.single("image"), detectAnimal);
router.post("/detect-disease", upload.single("image"), detectDisease);

module.exports = router;