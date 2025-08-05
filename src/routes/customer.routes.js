// /routes/customer.routes.js

const express = require('express');
const router = express.Router();
const { getNearbyVendors } = require('../controllers/customer.controller');

// Route: POST /customer/nearby-vendors
// Purpose: Get vendors near customer's current location (from WhatsApp or Web)
router.post('/nearby-vendors', getNearbyVendors);

module.exports = router;
