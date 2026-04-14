const fs = require('fs');
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
const base64Image = fs.readFileSync('../frontend/logo.png', 'base64');

ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: [
        {
          role: 'user',
          parts: [
            { text: 'Analyze this' },
            {
              inlineData: {
                data: base64Image,
                mimeType: 'image/png',
              }
            }
          ]
        }
    ]
}).then(() => console.log('success')).catch(e => {
    fs.writeFileSync('test.log', e.message);
});
