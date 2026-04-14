const axios = require("axios");
const fs = require("fs");
const { GoogleGenAI } = require("@google/genai");

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

exports.detectDisease = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY not configured" });
    }

    const ai = new GoogleGenAI({ apiKey: apiKey });

    // Read the file as base64
    const fileBytes = fs.readFileSync(req.file.path);
    const base64Image = fileBytes.toString("base64");

    const prompt = `
      You are an expert veterinary AI specializing in poultry and livestock.
      Analyze this image of an animal to detect any visible diseases or health issues.

      Provide the result strictly as a JSON object with the following structure, and do not include any markdown formatting or extra text:
      {
        "disease": "Name of the detected disease or 'Healthy' if no clear disease is visible",
        "confidence": "A percentage indicating your confidence level (e.g., '85%')",
        "description": "A brief description of the symptoms visible in the image",
        "treatment": "Recommended actions or general treatment advice (include a disclaimer to consult a vet)"
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: [
        prompt,
        {
          inlineData: {
            data: base64Image,
            mimeType: req.file.mimetype,
          }
        }
      ]
    });

    let resultText = response.text || "";
    
    // Clean up potential markdown formatting block if Gemini returns it
    resultText = resultText.trim();
    if (resultText.startsWith("\`\`\`json")) {
      resultText = resultText.replace(/^\`\`\`json\s*/, "").replace(/\s*\`\`\`$/, "");
    } else if (resultText.startsWith("\`\`\`")) {
      resultText = resultText.replace(/^\`\`\`\s*/, "").replace(/\s*\`\`\`$/, "");
    }

    try {
      const jsonResult = JSON.parse(resultText);
      res.json(jsonResult);
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", resultText);
      res.status(500).json({ error: "Failed to parse AI response into JSON", raw: resultText });
    }

  } catch (error) {
    if (error.response) {
      console.error("Error from Gemini API:", error.response);
    } else {
      console.error("Error in detectDisease:", error.message, error.stack);
    }
    res.status(500).json({ error: "AI disease detection failed", details: error.message });
  } finally {
    // Clean up the uploaded file
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
  }
};