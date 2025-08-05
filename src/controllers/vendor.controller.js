const {
    updateVendorProfileService,
    setVendorAvailabilityService,
    getMenuItemsService,
    getVendorProfileService,
    updateMenuItemsService
} = require('../services/vendor.service');

// 1. Get Vendor Profile
const getVendorProfile = async (req, res) => {
    try {
        const vendorId = req.params.id;
        const vendor = await getVendorProfileService(vendorId);
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

        res.json(vendor);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vendor profile', error });
    }
};

// 2. Update Vendor Profile
const updateVendorProfile = async (req, res) => {
    try {
        const vendorId = req.params.id;
        const updates = req.body;

        const updatedVendor = await updateVendorProfileService(vendorId, updates);
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

        const result = await updateMenuItemsService(vendorId, menu_items);
        if (!result) return res.status(404).json({ message: 'Vendor not found' });

        res.json({ message: 'Menu updated successfully', menu_items: result });
    } catch (error) {
        res.status(500).json({ message: 'Error updating menu items', error });
    }
};

// 4. Get Menu Items
const getMenuItems = async (req, res) => {
    try {
        const vendorId = req.params.id;
        const menu_items = await getMenuItemsService(vendorId);
        if (!menu_items) return res.status(404).json({ message: 'Vendor not found' });

        res.json(menu_items);
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

        const updated = await setVendorAvailabilityService(vendorId, active_status);
        if (!updated) return res.status(404).json({ message: 'Vendor not found' });

        res.json({ message: 'Vendor availability updated', active_status });
    } catch (error) {
        res.status(500).json({ message: 'Error setting availability', error });
    }
};

module.exports = {
    updateVendorProfile,
    setVendorAvailability,
    updateMenuItems,
    getMenuItems,
    getVendorProfile
};