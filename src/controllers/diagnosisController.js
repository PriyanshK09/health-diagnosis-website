const googleAIService = require('../services/googleAIService');

// Submit diagnosis form controller
exports.submitDiagnosis = async (req, res) => {
  const { symptoms } = req.body;

  try {
    // Call the Google AI API for diagnosis
    const diagnosis = await googleAIService.getDiagnosis(symptoms);

    res.json({ diagnosis });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};