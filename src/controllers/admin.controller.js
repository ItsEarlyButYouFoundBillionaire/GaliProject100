const Vendor = require('../models/Vendor');
const Customer = require('../models/Customer');
const DeliveryAgent = require('../models/DeliveryAgent');

// Get all vendors
exports.getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find();
        res.status(200).json({ success: true, data: vendors });
    } catch (error) {
        console.error('Error fetching vendors:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get all customers
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json({ success: true, data: customers });
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get all delivery agents
exports.getAllDeliveryAgents = async (req, res) => {
    try {
        const agents = await DeliveryAgent.find();
        res.status(200).json({ success: true, data: agents });
    } catch (error) {
        console.error('Error fetching delivery agents:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Approve a vendor
exports.approveVendor = async (req, res) => {
    try {
        const { vendorId } = req.params;

        const vendor = await Vendor.findByIdAndUpdate(
            vendorId,
            { isApproved: true, status: 'active' },
            { new: true }
        );

        if (!vendor) {
            return res.status(404).json({ success: false, message: 'Vendor not found' });
        }

        res.status(200).json({ success: true, message: 'Vendor approved', data: vendor });
    } catch (error) {
        console.error('Error approving vendor:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Approve a delivery agent
exports.approveDeliveryAgent = async (req, res) => {
    try {
        const { agentId } = req.params;

        const agent = await DeliveryAgent.findByIdAndUpdate(
            agentId,
            { isApproved: true, status: 'active' },
            { new: true }
        );

        if (!agent) {
            return res.status(404).json({ success: false, message: 'Delivery agent not found' });
        }

        res.status(200).json({ success: true, message: 'Delivery agent approved', data: agent });
    } catch (error) {
        console.error('Error approving delivery agent:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Ban a vendor
exports.banVendor = async (req, res) => {
    try {
        const { vendorId } = req.params;

        const vendor = await Vendor.findByIdAndUpdate(
            vendorId,
            { status: 'banned' },
            { new: true }
        );

        if (!vendor) {
            return res.status(404).json({ success: false, message: 'Vendor not found' });
        }

        res.status(200).json({ success: true, message: 'Vendor banned', data: vendor });
    } catch (error) {
        console.error('Error banning vendor:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Ban a customer
exports.banCustomer = async (req, res) => {
    try {
        const { customerId } = req.params;

        const customer = await Customer.findByIdAndUpdate(
            customerId,
            { status: 'banned' },
            { new: true }
        );

        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }

        res.status(200).json({ success: true, message: 'Customer banned', data: customer });
    } catch (error) {
        console.error('Error banning customer:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Ban a delivery agent
exports.banDeliveryAgent = async (req, res) => {
    try {
        const { agentId } = req.params;

        const agent = await DeliveryAgent.findByIdAndUpdate(
            agentId,
            { status: 'banned' },
            { new: true }
        );

        if (!agent) {
            return res.status(404).json({ success: false, message: 'Delivery agent not found' });
        }

        res.status(200).json({ success: true, message: 'Delivery agent banned', data: agent });
    } catch (error) {
        console.error('Error banning delivery agent:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
