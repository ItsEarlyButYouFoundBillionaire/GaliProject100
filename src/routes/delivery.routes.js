const express = require('express')
const router = express.Router();

//importing the controller function
const {
    getNearbyVendors,

}= require('../controllers/customer.controller')

//routes
router.get("/vendors/nearby",getNearbyVendors);

module.exports = router;