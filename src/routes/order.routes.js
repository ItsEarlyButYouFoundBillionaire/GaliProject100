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
router.post('/api/orders', placeOrder);

// 👤 2. Get all orders by a specific customer
router.get('/api/orders/customer/:id', getOrdersByCustomers);

// 🏪 3. Get all orders by a vendor
router.get('/api/orders/vendor/:id', getOrderByVendor);

// 🛵 4. Get all orders by delivery agent
router.get('/api/orders/agent/:id', getOrderByDeliveryAgent);

// 🔄 5. Update order status (e.g., pending → accepted → delivered)
router.patch('/api/orders/:orderID/status', updateOrderStatus);

// ❌ 6. Cancel an order
router.patch('/api/orders/:orderID/cancel', cancelOrder);

// 🔍 7. Get single order by ID (optional)
router.get('/api/orders/:orderID', getOrderById);

// ✅ Export the router
module.exports = router;
