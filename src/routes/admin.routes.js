// /routes/admin.routes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

// Admin Login (optional if hardcoded admin)
router.post('/login', adminController.loginAdmin);

// ---------------- Vendor Management ----------------

// Register vendor by admin
router.post('/vendors/register', adminController.registerVendorByAdmin);

// Get all vendors
router.get('/vendors', adminController.getAllVendors);

// Approve vendor
router.put('/vendors/:vendorId/approve', adminController.approveVendor);

// Ban vendor
router.put('/vendors/:vendorId/ban', adminController.banVendor);

// Get vendor earnings (specific vendor)
router.get('/vendors/:vendorId/earnings', adminController.getPlatformEarnings);

// ---------------- Customer Management ----------------

// Get all customers
router.get('/customers', adminController.getAllCustomers);

// Ban customer
router.put('/customers/:customerId/ban', adminController.banCustomer);

// ---------------- Delivery Agent Management ----------------

// Get all delivery agents
router.get('/agents', adminController.getAllDeliveryAgents);

// Approve delivery agent
router.put('/agents/:agentId/approve', adminController.approveDeliveryAgent);

// Ban delivery agent
router.put('/agents/:agentId/ban', adminController.banDeliveryAgent);

// ---------------- Platform Earnings & Revenue ----------------

// Get overall platform earnings
router.get('/earnings', adminController.getPlatformEarnings);

// Get total revenue
router.get('/revenue', adminController.getTotalRevenue);

module.exports = router;
