const express = require("express");
const router = express.Router();
const multer = require("multer");

<<<<<<< HEAD
const storage = multer.diskStorage({
 destination: "uploads/",
 filename: (req,file,cb)=>{
  cb(null,Date.now()+"-"+file.originalname);
 }
});


const upload = multer({storage});
router.get("/", (req, res) => {
  res.json({ message: "Disease API working" });
});
router.post("/upload",upload.single("image"),(req,res)=>{

 res.json({
  message:"Image uploaded",
  file:req.file.filename
 });
=======
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
>>>>>>> bda5eaf0146a2d6109669ff51219ae0bd3afe04c

});

module.exports = router;