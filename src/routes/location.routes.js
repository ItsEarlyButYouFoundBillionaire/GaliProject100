const express = require("express");
const router = express.Router();

const {
    updateLocation,
    getLocation,
} = require("../controllers/location.controller");

// Route: Update location of delivery agent
router.post("/update", updateLocation);

// Route: Get location of delivery agent (for frontend live tracking)
router.get("/:agentId", getLocation);

module.exports = router;
