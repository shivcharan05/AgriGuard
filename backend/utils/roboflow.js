const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

const predictImage = async (imagePath) => {

  const form = new FormData();
  form.append("file", fs.createReadStream(imagePath));

  const response = await axios.post(
    "https://classify.roboflow.com/agriguard/1?api_key=YOUR_API_KEY",
    form,
    {
      headers: form.getHeaders()
    }
  );

  return response.data;
};

module.exports = predictImage;