const Order = require('../models/Order');
const Vendor = require('../models/Vendor');
const DeliveryAgent = require('../models/DeliveryAgent');
const Customer = require('../models/Customer');

// Vendor overall stats
async function getVendorStatsService(vendorID) {
    const orders = await Order.find({ vendorID, status: 'delivered' });
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total_price, 0);
    return { totalOrders, totalRevenue };
}

// Vendor daily stats
async function getDailyVendorStatsService(vendorID) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const orders = await Order.find({
        vendorID,
        status: 'delivered',
        createdAt: { $gte: startOfDay, $lte: endOfDay }
    });

    const todaysOrders = orders.length;
    const todaysRevenue = orders.reduce((sum, order) => sum + order.total_price, 0);
    return { todaysOrders, todaysRevenue };
}

// Customer stats
async function getCustomerOrderStatsService(customerID) {
    const orders = await Order.find({ customerID });
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, order) => sum + order.total_price, 0);
    return { totalOrders, totalSpent };
}

// Delivery agent stats
async function getDeliveryAgentStatsService(agentID) {
    const orders = await Order.find({ deliveryagentID: agentID, status: 'delivered' });
    const totalDelivered = orders.length;
    const totalEarnings = orders.reduce((sum, order) => sum + (order.deliveryFee || 0), 0);
    return { totalDelivered, totalEarnings };
}

// Admin overview
async function getAdminOverviewStatsService() {
    const [totalCustomers, totalVendors, totalDeliveryAgents, totalOrders] = await Promise.all([
        Customer.countDocuments(),
        Vendor.countDocuments(),
        DeliveryAgent.countDocuments(),
        Order.countDocuments(),
    ]);
    return { totalCustomers, totalVendors, totalDeliveryAgents, totalOrders };
}

// Total revenue for admin
async function getTotalRevenueService() {
    const deliveredOrders = await Order.find({ status: 'delivered' });
    return deliveredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
}

module.exports = {
    getVendorStatsService,
    getDailyVendorStatsService,
    getCustomerOrderStatsService,
    getDeliveryAgentStatsService,
    getAdminOverviewStatsService,
    getTotalRevenueService,
};