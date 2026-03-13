const axios = require("axios");
const fs = require("fs");

exports.detectAnimal = async (req, res) => {
  try {

    const image = fs.readFileSync(req.file.path);

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/microsoft/resnet-50",
      image,
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/octet-stream"
        }
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI detection failed" });
  }
};