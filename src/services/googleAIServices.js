const axios = require('axios');

// Get diagnosis from Google AI API
exports.getDiagnosis = async (symptoms) => {
  try {
    const response = await axios.post('https://api.example.com/diagnosis', {
      symptoms,
      apiKey: process.env.GOOGLE_AI_API_KEY,
    });

    return response.data.diagnosis;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get diagnosis from Google AI API');
  }
};