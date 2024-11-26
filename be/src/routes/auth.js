const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/change-password', authController.changePassword);
router.post('/forgot-password', authController.forgotPassword);
router.put('/update-profile', authController.updateProfile);

module.exports = router;