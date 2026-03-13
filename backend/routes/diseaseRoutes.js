const express = require("express");
const router = express.Router();
const multer = require("multer");

// Storage configuration
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Test route
router.get("/", (req, res) => {
  res.json({ message: "Disease API working" });
});

// Upload image
router.post("/upload", upload.single("image"), (req, res) => {

  if (!req.file) {
    return res.status(400).json({
      message: "No image uploaded"
    });
  }

  res.json({
    message: "Image uploaded successfully",
    file: req.file.filename
  });

});

module.exports = router;