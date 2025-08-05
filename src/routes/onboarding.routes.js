// /routes/onboarding.routes.js

const express = require('express');
const router = express.Router();
const { registerVendorByAdmin } = require('../controllers/onboarding.controller');
const { verifyToken, checkRole } = require('../middleware/auth.middleware');

// Route: POST /onboarding/vendor/register
// Purpose: Admin/agent registers a vendor without approval process
router.post('/vendor/register', verifyToken, checkRole(['admin', 'agent']), registerVendorByAdmin);

module.exports = router;
