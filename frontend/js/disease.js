window.uploadImage = async function() {
    const fileInput = document.getElementById('image');
    const resultDiv = document.getElementById('result');
    
    if (!fileInput.files || fileInput.files.length === 0) {
        alert("Please select an image first.");
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('image', file);

    resultDiv.innerHTML = `
        <div style="text-align:center; padding: 20px;">
            <p style="color: #2e7d32; font-weight: bold; margin-bottom: 10px;">Analyzing image...</p>
            <small style="color: #666;">This usually takes a few seconds.</small>
        </div>
    `;

    try {
        const response = await fetch('http://localhost:5000/api/ai/detect-disease', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to analyze image");
        }

        const isHealthy = data.disease && data.disease.toLowerCase().includes('healthy');
        const color = isHealthy ? '#4caf50' : '#d32f2f';

        // Display results beautifully inside the user's existing #result div
        let resultHtml = `
            <div style="text-align:left; padding: 20px; border-radius: 8px; background: #fafafa; border: 1px solid #ccc; font-family: Arial, sans-serif;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid ${color}; padding-bottom: 10px; margin-bottom: 20px;">
                    <h3 style="color:${color}; margin: 0; font-size: 24px;">
                      ${data.disease || 'Unknown'} 
                    </h3>
                    <span style="font-size: 14px; color: white; background: #1976d2; padding: 5px 15px; border-radius: 20px; font-weight: bold;">
                      ${data.confidence || 'N/A'} Match
                    </span>
                </div>
                
                <p style="color: #333; font-size: 16px; margin-bottom: 20px; line-height: 1.5;">
                    <strong style="color: #555; text-transform: uppercase; font-size: 13px; display: block; margin-bottom: 5px;">Detection Overview</strong>
                    ${data.description || 'No description provided.'}
                </p>
                
                <div style="background:#fff3e0; padding:20px; border-left:5px solid #ff9800; border-radius:5px; margin-top: 15px;">
                    <strong style="color: #e65100; text-transform: uppercase; font-size: 13px; display: block; margin-bottom: 10px;">Recommended Action</strong>
                    <p style="color: #444; margin: 0; font-size: 15px; line-height: 1.5;">
                        ${data.treatment || 'Consult a veterinary professional.'}
                    </p>
                </div>
                
                <p style="margin-top: 20px; font-size: 12px; color: #999; font-style: italic;">
                    ⚠️ Note: This is an AI assessment. Always consult with a licensed veterinarian for official medical diagnosis and prescriptions.
                </p>
            </div>
        `;
        resultDiv.innerHTML = resultHtml;

    } catch (error) {
        console.error('Error during analysis:', error);
        resultDiv.innerHTML = `
            <div style="color: #d32f2f; text-align:center; padding: 20px; background: #ffebee; border-radius: 10px;">
                <strong>Analysis Failed:</strong> ${error.message}
            </div>
        `;
    }
}