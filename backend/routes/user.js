const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/medical-issues', userController.addMedicalIssues);
router.post('/consultation-details', userController.addConsultationDetails);
router.get('/info', userController.getUserInfo);

module.exports = router;