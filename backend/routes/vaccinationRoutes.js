const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Vaccination API working");
});

module.exports = router;