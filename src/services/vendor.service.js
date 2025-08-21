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
//6. Get nearby Vendors
const getNearByVendorsService = async (latitude, longitude) => {
    if (!latitude || !longitude) {
        throw new Error("Please share your current location");
    }

    const vendors = await Vendor.find({
        location: {
            $near: {
                $geometry: { type: "Point", coordinates: [longitude, latitude] }, // GeoJSON: [lng, lat]
                $maxDistance: 3000, // 3km
            },
        },
    });

    return vendors;
};
// 7. getting menu by the vendor id
const getVendorMenuById = async (vendorId) => {
    try {
        const vendor = await Vendor.findById(vendorId).select("menu_items name");
        if (!vendor) {
            throw new Error("Vendor not found");
        }
        return vendor.menu_items;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getVendorMenuById,
    getNearByVendorsService,
    updateVendorProfileService,
    setVendorAvailabilityService,
    updateMenuItemsService,
    getMenuItemsService,
    getVendorProfileService
};