const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Get user information
router.get('/user', dashboardController.getUserInfo);

module.exports = router;