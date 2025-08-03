const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendor.controller')

// GET vendor profile by ID
router.get('/:id/profile', vendorController.getVendorProfile);

// PUT update vendor profile (excluding menu)
router.put('/:id/profile', vendorController.updateVendorProfile);

// PUT update menu items
router.put('/:id/menu', vendorController.updateMenuItems);

// GET menu items
router.get('/:id/menu', vendorController.getMenuItems);

// PUT set vendor availability (active/notActive/outOfStock)
router.put('/:id/availability', vendorController.setVendorAvailability);

module.exports = router;
