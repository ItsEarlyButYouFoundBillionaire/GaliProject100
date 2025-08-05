const Vendor = require('../models/Vendor');

// 1. Get Vendor Profile
const getVendorProfile = async (req, res) => {
    try {
        const vendorId = req.params.id;
        const vendor = await Vendor.findById(vendorId).select('-order_history -__v');
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

        res.json(vendor);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vendor profile', error });
    }
};

// 2. Update Vendor Profile (excluding menu)
const updateVendorProfile = async (req, res) => {
    try {
        const vendorId = req.params.id;
        const updates = req.body;

        updates.last_updated = new Date();

        const updatedVendor = await Vendor.findByIdAndUpdate(
            vendorId,
            { $set: updates },
            { new: true }
        );

        if (!updatedVendor) return res.status(404).json({ message: 'Vendor not found' });

        res.json(updatedVendor);
    } catch (error) {
        res.status(500).json({ message: 'Error updating vendor profile', error });
    }
};

// 3. Update Menu Items
const updateMenuItems = async (req, res) => {
    try {
        const vendorId = req.params.id;
        const { menu_items } = req.body;

        const vendor = await Vendor.findById(vendorId);
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

        vendor.menu_items = menu_items;
        vendor.last_updated = new Date();
        await vendor.save();

        res.json({ message: 'Menu updated successfully', menu_items });
    } catch (error) {
        res.status(500).json({ message: 'Error updating menu items', error });
    }
};

// 4. Get Menu Items
const getMenuItems = async (req, res) => {
    try {
        const vendorId = req.params.id;
        const vendor = await Vendor.findById(vendorId).select('menu_items');
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

        res.json(vendor.menu_items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu items', error });
    }
};

// 5. Set Vendor Availability
const setVendorAvailability = async (req, res) => {
    try {
        const vendorId = req.params.id;
        const { active_status } = req.body;

        if (!['active', 'notActive', 'outOfStock'].includes(active_status)) {
            return res.status(400).json({ message: 'Invalid active_status' });
        }

        const updatedVendor = await Vendor.findByIdAndUpdate(
            vendorId,
            { active_status, last_updated: new Date() },
            { new: true }
        );

        if (!updatedVendor) return res.status(404).json({ message: 'Vendor not found' });

        res.json({ message: 'Vendor availability updated', active_status });
    } catch (error) {
        res.status(500).json({ message: 'Error setting availability', error });
    }
};
module.exports = {
    updateVendorProfile,
    setVendorAvailability,
    getMenuItems,
    getVendorProfile,
    setVendorAvailability
};