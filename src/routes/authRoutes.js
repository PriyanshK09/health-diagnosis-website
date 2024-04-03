const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login route
router.post('/login', authController.login);

// Signup route
router.post('/signup', authController.signup);

module.exports = router;