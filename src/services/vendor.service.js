const Vendor = require('../models/Vendor');

// 1. Get Vendor Profile
const getVendorProfileService = async (vendorId) => {
    return await Vendor.findById(vendorId).select('-order_history -__v');
};

// 2. Update Vendor Profile (excluding menu)
const updateVendorProfileService = async (vendorId, updates) => {
    updates.last_updated = new Date();
    return await Vendor.findByIdAndUpdate(vendorId, { $set: updates }, { new: true });
};

// 3. Update Menu Items
const updateMenuItemsService = async (vendorId, menu_items) => {
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) return null;

    vendor.menu_items = menu_items;
    vendor.last_updated = new Date();
    await vendor.save();

    return vendor.menu_items;
};

// 4. Get Menu Items
const getMenuItemsService = async (vendorId) => {
    const vendor = await Vendor.findById(vendorId).select('menu_items');
    return vendor ? vendor.menu_items : null;
};

// 5. Set Vendor Availability
const setVendorAvailabilityService = async (vendorId, active_status) => {
    return await Vendor.findByIdAndUpdate(
        vendorId,
        { active_status, last_updated: new Date() },
        { new: true }
    );
};

module.exports = {
    updateVendorProfileService,
    setVendorAvailabilityService,
    updateMenuItemsService,
    getMenuItemsService,
    getVendorProfileService
};