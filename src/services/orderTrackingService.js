const Order = require('../models/Order');
const LiveLocation = require('../models/LiveLocation');

// 1. Get current status of an order
const getOrderStatusService = async (orderId) => {
    const order = await Order.findById(orderId);
    if (!order) {
        throw new Error('Order not found');
    }

    const statusInfo = {
        status: order.status,
        updatedAt: order.updatedAt,
    };

    if (order.deliveryAgentId) {
        const liveLocation = await LiveLocation.findOne({
            deliveryAgentId: order.deliveryAgentId,
        });

        if (liveLocation) {
            statusInfo.deliveryAgentLocation = liveLocation.location;
        }
    }

    return statusInfo;
};

// 2. Get all orders of a customer
const getCustomerOrdersService = async (customerId) => {
    const orders = await Order.find({ customerId }).sort({ createdAt: -1 });
    return orders;
};

// 3. Get all orders for a vendor
const getVendorOrdersService = async (vendorId) => {
    const orders = await Order.find({ vendorId }).sort({ createdAt: -1 });
    return orders;
};

// 4. Get all orders assigned to a delivery agent
const getDeliveryAgentOrdersService = async (deliveryAgentId) => {
    const orders = await Order.find({ deliveryAgentId }).sort({ createdAt: -1 });
    return orders;
};

// 5. Get detailed info about one order
const getOrderDetailsService = async (orderId) => {
    const order = await Order.findById(orderId)
        .populate('customerId', 'name phone')
        .populate('vendorId', 'stall_name location');

    if (!order) {
        throw new Error('Order not found');
    }

    return order;
};

module.exports = {
    getOrderStatusService,
    getCustomerOrdersService,
    getVendorOrdersService,
    getDeliveryAgentOrdersService,
    getOrderDetailsService,
};