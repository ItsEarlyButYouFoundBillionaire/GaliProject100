// src/controllers/location.controller.js

const {
    updateAgentLocationService,
    getAgentLocationService,
    // getAllAgentsLocationService, // ❌ Removed for MVP (not needed unless you want a live dashboard of all agents)
    // removeAgentLocationService,  // ❌ Removed because deleting location is not practical — agents should just update location
} = require('../services/location.service');

// ✅ Update agent's live location
exports.updateAgentLocation = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { latitude, longitude } = req.body;

        const location = await updateAgentLocationService(id, latitude, longitude);
        res.status(200).json({ success: true, data: location });
    } catch (error) {
        next(error);
    }
};

// ✅ Get a specific agent's location
exports.getAgentLocation = async (req, res, next) => {
    try {
        const { id } = req.params;
        const location = await getAgentLocationService(id);

        if (!location) {
            return res.status(404).json({ success: false, message: 'Location not found' });
        }

        res.status(200).json({ success: true, data: location });
    } catch (error) {
        next(error);
    }
};

/*
// ❌ Not needed for MVP
exports.getAllAgentsLocation = async (req, res, next) => {
    try {
        const locations = await getAllAgentsLocationService();
        res.status(200).json({ success: true, data: locations });
    } catch (error) {
        next(error);
    }
};

// ❌ Not needed for MVP
exports.removeAgentLocation = async (req, res, next) => {
    try {
        const { id } = req.params;
        await removeAgentLocationService(id);
        res.status(200).json({ success: true, message: 'Location removed successfully' });
    } catch (error) {
        next(error);
    }
};
*/
