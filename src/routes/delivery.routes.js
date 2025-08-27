const express = require('express');
const router = express.Router();

const {
    registerDeliveryAgent,
    getAllDeliveryAgents,
    getDeliveryAgentById,
    updateDeliveryAgentLocation,
    updateAvailabilityStatus,
    assignOrderToAgent,
    removeOrderFromAgent,
    removeDeliveryAgent,
    assignAgent,
} = require('../controllers/delivery.controller');

// Register a new delivery agent
router.post('/register', registerDeliveryAgent);

// Get all delivery agents
router.get('/', getAllDeliveryAgents);

// Get delivery agent by ID
router.get('/:id', getDeliveryAgentById);

// Update delivery agent location
router.put('/:id/location', updateDeliveryAgentLocation);

// Update availability status (online/offline)
router.put('/:id/status', updateAvailabilityStatus);

// Assign order to a delivery agent
router.post('/:id/orders/assign', assignOrderToAgent);

// Remove order from a delivery agent
router.post('/:id/orders/remove', removeOrderFromAgent);

// Remove delivery agent
router.delete('/:id', removeDeliveryAgent);

// Assign an agent to an order (alt route, for admin or dispatcher)
router.post('/assign', assignAgent);

module.exports = router;
