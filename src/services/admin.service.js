// services/admin.service.js

const Vendor = require('../models/Vendor');
const Customer = require('../models/Customer');
const DeliveryAgent = require('../models/DeliveryAgent');
const Order = require('../models/Order');

const getAllVendorsService = async () => {
    return await Vendor.find();
};

const getAllCustomersService = async () => {
    return await Customer.find();
};

const getAllDeliveryAgentsService = async () => {
    return await DeliveryAgent.find();
};

const approveVendorService = async (vendorId) => {
    return await Vendor.findByIdAndUpdate(
        vendorId,
        { isApproved: true, status: 'active' },
        { new: true }
    );
};

const approveDeliveryAgentService = async (agentId) => {
    return await DeliveryAgent.findByIdAndUpdate(
        agentId,
        { isApproved: true, status: 'active' },
        { new: true }
    );
};

const banVendorService = async (vendorId) => {
    return await Vendor.findByIdAndUpdate(vendorId, { status: 'banned' }, { new: true });
};

const banCustomerService = async (customerId) => {
    return await Customer.findByIdAndUpdate(customerId, { status: 'banned' }, { new: true });
};

const banDeliveryAgentService = async (agentId) => {
    return await DeliveryAgent.findByIdAndUpdate(agentId, { status: 'banned' }, { new: true });
};

const getTotalRevenueService = async () => {
    const result = await Order.aggregate([
        { $match: { status: 'delivered' } },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$totalAmount" }
            }
        }
    ]);
    return result[0]?.totalRevenue || 0;
};

const getPlatformEarningsService = async () => {
    const deliveredOrders = await Order.find({ status: 'delivered' });
    return deliveredOrders.reduce((sum, order) => sum + (order.platformCommission || 0), 0);
};

const registerVendorByAdminService = async (vendorData) => {
    const { phone } = vendorData;
    const existingVendor = await Vendor.findOne({ phone });
    if (existingVendor) return null;

    const newVendor = new Vendor({
        ...vendorData,
        isVerified: true,
        onboardedBy: 'admin',
    });
    return await newVendor.save();
};

module.exports = {
    getAllVendorsService,
    getAllCustomersService,
    getAllDeliveryAgentsService,
    approveVendorService,
    approveDeliveryAgentService,
    banVendorService,
    banCustomerService,
    banDeliveryAgentService,
    getTotalRevenueService,
    getPlatformEarningsService,
    registerVendorByAdminService
};