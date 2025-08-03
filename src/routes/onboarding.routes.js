const express = require("express");
const router = express.Router();

// Controller
const {
    registerVendorByAdmin,
} = require("../controllers/onboarding.controller");

// Route: Admin/Agent onboarding a vendor
router.post("/vendor/register", registerVendorByAdmin);

module.exports = router;
