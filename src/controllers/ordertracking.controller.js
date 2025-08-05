const {
    getOrderStatusService,
    getCustomerOrdersService,
    getVendorOrdersService,
    getDeliveryAgentOrdersService,
    getOrderDetailsService,
} = require('../services/orderTrackingService');

// 1. Get order status with location (if assigned)
const getOrderStatus = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const statusInfo = await getOrderStatusService(orderId);
        res.json({ success: true, data: statusInfo });
    } catch (err) {
        next(err);
    }
};

// 2. Get all orders of a customer
const getCustomerOrders = async (req, res, next) => {
    try {
        const { customerId } = req.params;
        const orders = await getCustomerOrdersService(customerId);
        res.json({ success: true, data: orders });
    } catch (err) {
        next(err);
    }
};

// 3. Get all orders for a vendor
const getVendorOrders = async (req, res, next) => {
    try {
        const { vendorId } = req.params;
        const orders = await getVendorOrdersService(vendorId);
        res.json({ success: true, data: orders });
    } catch (err) {
        next(err);
    }
};

// 4. Get all orders assigned to a delivery agent
const getDeliveryAgentOrders = async (req, res, next) => {
    try {
        const { deliveryAgentId } = req.params;
        const orders = await getDeliveryAgentOrdersService(deliveryAgentId);
        res.json({ success: true, data: orders });
    } catch (err) {
        next(err);
    }
};

// 5. Get detailed info about an order
const getOrderDetails = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const order = await getOrderDetailsService(orderId);
        res.json({ success: true, data: order });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getOrderStatus,
    getCustomerOrders,
    getVendorOrders,
    getDeliveryAgentOrders,
    getOrderDetails,
};