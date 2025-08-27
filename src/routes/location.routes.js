// src/routes/location.routes.js

const express = require("express");
const router = express.Router();

const {
    updateAgentLocation,
    getAgentLocation,
} = require("../controllers/location.controller");

// @route   POST /api/location/update
// @desc    Update delivery agent's live location
// @access  Public (add auth later if needed)
router.post("/update", updateAgentLocation);

// @route   GET /api/location/:agentId
// @desc    Get delivery agent's current location
// @access  Public (add auth later if needed)
router.get("/:agentId", getAgentLocation);

module.exports = router;
