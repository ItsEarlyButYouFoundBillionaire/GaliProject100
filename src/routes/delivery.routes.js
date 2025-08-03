// /routes/delivery.routes.js

const express = require('express')
const router = express.Router();

const {
    registerDeliveryAgent,
    getAllDeliveryAgents,
    getDeliveryAgentById,
    updateDeliveryAgentLocation,
    updateAvailabilityStatus,
    assignOrderToAgent,
    removeOrderFromAgent,
    removeDeliveryAgent
} = require("../controllers/delivery.controller");

// Register a new delivery agent
router.post("/agents/register", registerDeliveryAgent);

// Get all delivery agents
router.get("/agents", getAllDeliveryAgents);

// Get a specific delivery agent by ID
router.get("/agents/:id", getDeliveryAgentById);

// Update delivery agent location
router.put("/agents/:id/location", updateDeliveryAgentLocation);

// Update availability status
router.put("/agents/:id/status", updateAvailabilityStatus);

// Assign an order to a delivery agent
router.put("/agents/:id/assign-order", assignOrderToAgent);

// Remove an order from a delivery agent
router.put("/agents/:id/remove-order", removeOrderFromAgent);

// Delete a delivery agent
router.delete("/agents/:id", removeDeliveryAgent);

module.exports = router;
