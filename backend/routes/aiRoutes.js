const express = require("express");
const router = express.Router();
const multer = require("multer");

const { detectAnimal } = require("../controllers/aiController");

const upload = multer({ dest: "uploads/" });

router.post("/detect", upload.single("image"), detectAnimal);

module.exports = router;