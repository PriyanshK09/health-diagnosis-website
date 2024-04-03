const express = require('express');
const router = express.Router();
const diagnosisController = require('../controllers/diagnosisController');

// Submit diagnosis form
router.post('/', diagnosisController.submitDiagnosis);

module.exports = router;