// /routes/admin.routes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

// Admin Login (can be skipped if you're doing hardcoded admin)
router.post('/login', adminController.loginAdmin);

// Admin creates vendor account (used by field agent/admin)
router.post('/vendors/register', adminController.registerVendorByAdmin);

// Admin gets list of all vendors
router.get('/vendors', adminController.getAllVendors);

// Admin gets vendor earnings
router.get('/vendors/:vendorId/earnings', adminController.getVendorEarnings);

// Admin gets overall platform earnings
router.get('/earnings', adminController.getPlatformEarnings);

module.exports = router;
