// controllers/admin.controller.js

const adminService = require('../services/admin.service');

// ✅ Get all vendors
const getAllVendors = async (req, res) => {
    try {
        const vendors = await adminService.getAllVendors();
        res.status(200).json({ success: true, data: vendors });
    } catch (error) {
        console.error('Error fetching vendors:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// ✅ Get all customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await adminService.getAllCustomers();
        res.status(200).json({ success: true, data: customers });
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// ✅ Get all delivery agents
const getAllDeliveryAgents = async (req, res) => {
    try {
        const agents = await adminService.getAllDeliveryAgents();
        res.status(200).json({ success: true, data: agents });
    } catch (error) {
        console.error('Error fetching delivery agents:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// ✅ Approve a vendor
const approveVendor = async (req, res) => {
    try {
        const { vendorId } = req.params;
        const updatedVendor = await adminService.approveVendor(vendorId);
        res.status(200).json({ success: true, data: updatedVendor });
    } catch (error) {
        console.error('Error approving vendor:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// ✅ Approve a delivery agent
const approveDeliveryAgent = async (req, res) => {
    try {
        const { agentId } = req.params;
        const updatedAgent = await adminService.approveDeliveryAgent(agentId);
        res.status(200).json({ success: true, data: updatedAgent });
    } catch (error) {
        console.error('Error approving delivery agent:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// ✅ Ban a vendor
const banVendor = async (req, res) => {
    try {
        const { vendorId } = req.params;
        const bannedVendor = await adminService.banVendor(vendorId);
        res.status(200).json({ success: true, data: bannedVendor });
    } catch (error) {
        console.error('Error banning vendor:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// ✅ Ban a customer
const banCustomer = async (req, res) => {
    try {
        const { customerId } = req.params;
        const bannedCustomer = await adminService.banCustomer(customerId);
        res.status(200).json({ success: true, data: bannedCustomer });
    } catch (error) {
        console.error('Error banning customer:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// ✅ Ban a delivery agent
const banDeliveryAgent = async (req, res) => {
    try {
        const { agentId } = req.params;
        const bannedAgent = await adminService.banDeliveryAgent(agentId);
        res.status(200).json({ success: true, data: bannedAgent });
    } catch (error) {
        console.error('Error banning delivery agent:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// ✅ Get total revenue
const getTotalRevenue = async (req, res) => {
    try {
        const totalRevenue = await adminService.getTotalRevenue();
        res.status(200).json({ success: true, totalRevenue });
    } catch (error) {
        console.error('Error fetching revenue:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// ✅ Get platform earnings
const getPlatformEarnings = async (req, res) => {
    try {
        const earnings = await adminService.getPlatformEarnings();
        res.status(200).json({ success: true, earnings });
    } catch (error) {
        console.error('Error fetching platform earnings:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// ✅ Register vendor by admin
const registerVendorByAdmin = async (req, res) => {
    try {
        const vendor = await adminService.registerVendorByAdmin(req.body);
        if (!vendor) {
            return res.status(400).json({ success: false, message: 'Vendor already exists' });
        }
        res.status(201).json({ success: true, data: vendor });
    } catch (error) {
        console.error('Error registering vendor:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    getAllVendors,
    getAllCustomers,
    getAllDeliveryAgents,
    approveVendor,
    approveDeliveryAgent,
    banVendor,
    banCustomer,
    banDeliveryAgent,
    getTotalRevenue,
    getPlatformEarnings,
    registerVendorByAdmin,
};