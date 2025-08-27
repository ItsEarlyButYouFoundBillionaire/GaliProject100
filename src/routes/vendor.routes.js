const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendor.controller');

// 👤 Get vendor profile by ID
router.get('/:id/profile', vendorController.getVendorProfile);

// ✏️ Update vendor profile (excluding menu)
router.put('/:id/profile', vendorController.updateVendorProfile);

// 🍽️ Update menu items
router.put('/:id/menu', vendorController.updateMenuItems);

// 📋 Get menu items
router.get('/:id/menu', vendorController.getMenuItems);

// ✅ Set vendor availability (active/notActive/outOfStock)
router.put('/:id/availability', vendorController.setVendorAvailability);

// 📍 Get nearby vendors
router.get('/nearby', vendorController.getNearByVendors);

// 🍴 Get vendor menu by vendorId (alternative detailed menu fetch)
router.get('/:vendorId/menu-items', vendorController.getVendorMenuById);

module.exports = router;
