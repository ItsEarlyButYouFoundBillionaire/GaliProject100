// /routes/auth.routes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Customer/Vendor starts login (request OTP)
router.post('/send-otp', authController.sendOTPToUser);

// Customer/Vendor verifies OTP and logs in
router.post('/verify-otp', authController.verifyOTP);

//login for the admin
router.post('/login',authController.loginAdmin);

//logout for admin
router.post('/logout',authController.logoutAdmin)

module.exports = router;
