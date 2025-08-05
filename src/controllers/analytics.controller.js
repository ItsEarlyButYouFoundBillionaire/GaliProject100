const analyticsService = require('../services/analytics.service');

// For vendor dashboard
const getVendorStats = async (req, res, next) => {
    try {
        const stats = await analyticsService.getVendorStats(req.params.vendorID);
        res.json(stats);
    } catch (error) {
        next(error);
    }
};

const getDailyVendorStats = async (req, res, next) => {
    try {
        const stats = await analyticsService.getDailyVendorStats(req.params.vendorID);
        res.json(stats);
    } catch (error) {
        next(error);
    }
};

// For customer app
const getCustomerOrderStats = async (req, res, next) => {
    try {
        const stats = await analyticsService.getCustomerOrderStats(req.params.customerID);
        res.json(stats);
    } catch (error) {
        next(error);
    }
};

// For delivery agent panel
const getDeliveryAgentStats = async (req, res, next) => {
    try {
        const stats = await analyticsService.getDeliveryAgentStats(req.params.agentID);
        res.json(stats);
    } catch (error) {
        next(error);
    }
};

// For admin dashboard
const getAdminOverviewStats = async (req, res, next) => {
    try {
        const stats = await analyticsService.getAdminOverviewStats();
        res.json(stats);
    } catch (error) {
        next(error);
    }
};

const getTotalRevenue = async (req, res, next) => {
    try {
        const revenue = await analyticsService.getTotalRevenue();
        res.json({ totalRevenue: revenue });
    } catch (error) {
        next(error);
    }
};
module.exports={
    getVendorStats,
    getAdminOverviewStats,
    getTotalRevenue,
    getCustomerOrderStats,
    getDeliveryAgentStats,
    getDailyVendorStats
};