const Vendor = require("../models/Vendor");

/**
 * Controller to handle onboarding of a new vendor by an admin/agent
 * (used in the field or backend dashboard, NOT WhatsApp).
 */
const registerVendorByAdmin = async (req, res) => {
    try {
        const {
            name,
            phone_number,
            business_name,
            location,
            food_categories,
            fssai_license, // optional: { number: "123456", status: "pending" }
        } = req.body;

        // Check if vendor already exists
        const existingVendor = await Vendor.findOne({ phone_number });
        if (existingVendor) {
            return res.status(409).json({
                success: false,
                message: "Vendor with this phone number already exists",
            });
        }

        // Create new Vendor
        const newVendor = new Vendor({
            name,
            phone_number,
            business_name,
            location,
            food_categories,
            fssai_license: fssai_license || { status: "pending" },
        });

        await newVendor.save();

        return res.status(201).json({
            success: true,
            message: "Vendor registered successfully",
            data: newVendor,
        });
    } catch (error) {
        console.error("Error registering vendor:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = {
    registerVendorByAdmin,
};
