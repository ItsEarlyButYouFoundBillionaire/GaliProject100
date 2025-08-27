// src/services/location.service.js

const LiveLocation = require('../models/LiveLocation');

// ✅ Update agent's live location (creates new if doesn't exist)
exports.updateAgentLocationService = async (agentId, latitude, longitude) => {
    const location = await LiveLocation.findOneAndUpdate(
        { agent: agentId },
        { latitude, longitude, updatedAt: new Date() },
        { new: true, upsert: true } // upsert = create if not exists
    );
    return location;
};

// ✅ Get a specific agent's location
exports.getAgentLocationService = async (agentId) => {
    return await LiveLocation.findOne({ agent: agentId });
};

/*
// ❌ Removed for MVP — only needed if you want a global "all agents location" view
exports.getAllAgentsLocationService = async () => {
    return await LiveLocation.find();
};

// ❌ Removed for MVP — no need to delete location, agents just stop updating
exports.removeAgentLocationService = async (agentId) => {
    return await LiveLocation.findOneAndDelete({ agent: agentId });
};
*/
