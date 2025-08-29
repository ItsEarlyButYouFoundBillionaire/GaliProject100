const express = require('express');
const router = express.Router();

// Import controller functions
const {
    placeOrder,
    getOrdersByCustomers,
    getOrderByVendor,
    getOrderByDeliveryAgent,
    updateOrderStatus,
    cancelOrder,
    getOrderById,
} = require('../controllers/order.controller');

// 📦 1. Place a new order
router.post('/orders', placeOrder);
// corrected: removed /api

// 👤 2. Get all orders by a specific customer
router.get('/orders/customer/:id', getOrdersByCustomers);
// corrected: removed /api

// 🏪 3. Get all orders by a vendor
router.get('/orders/vendor/:id', getOrderByVendor);
// corrected: removed /api

// 🛵 4. Get all orders by delivery agent
router.get('/orders/agent/:id', getOrderByDeliveryAgent);
// corrected: removed /api

// 🔄 5. Update order status (e.g., pending → accepted → delivered)
router.patch('/orders/:orderID/status', updateOrderStatus);
// corrected: removed /api

// ❌ 6. Cancel an order
router.patch('/orders/:orderID/cancel', cancelOrder);
// corrected: removed /api

// 🔍 7. Get single order by ID (optional)
router.get('/orders/:orderID', getOrderById);
// corrected: removed /api

// ✅ Export the router
module.exports = router;
