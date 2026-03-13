const express = require("express");
const router = express.Router();
const multer = require("multer");

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

});

module.exports = router;