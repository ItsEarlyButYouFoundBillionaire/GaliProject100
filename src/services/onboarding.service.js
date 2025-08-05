// services/onboarding.service.js
const Vendor = require('../models/Vendor');

/**
 * Service to register a vendor by admin/agent.
 */
const registerVendorByAdminService = async (vendorData) => {
    const { stall_name, contact_number } = vendorData;

    // Check if vendor already exists
    const existingVendor = await Vendor.findOne({ contact_number });
    if (existingVendor) {
        throw new Error("Vendor with this phone number already exists");
    }

    // Set default values if needed
    if (!vendorData.performance_metrics) {
        vendorData.performance_metrics = {
            order_success_rate: 100,
            hygiene_rating: 5,
            delay_complaints: 0,
            conversion_rate: 0
        };
    }

    // Save vendor
    const newVendor = new Vendor(vendorData);
    await newVendor.save();

    return newVendor;
};

module.exports = {
    registerVendorByAdminService,
};
