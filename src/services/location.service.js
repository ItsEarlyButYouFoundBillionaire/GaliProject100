// services/location.service.js
const LiveLocation = require("../models/LiveLocation");

/**
 * Update or insert the live location of a delivery agent.
 */
const updateLocationService = async ({ delivery_agent_id, latitude, longitude }) => {
    const updated = await LiveLocation.findOneAndUpdate(
        { delivery_agent: delivery_agent_id },
        {
            coordinates: {
                latitude,
                longitude,
            },
            updated_at: Date.now(),
        },
        { new: true, upsert: true }
    );
    return updated;
};

/**
 * Fetch the latest location of a delivery agent.
 */
const getLocationService = async (agentId) => {
    const location = await LiveLocation.findOne({ delivery_agent: agentId })
        .populate("delivery_agent", "name phone_number");
    return location;
};

module.exports = {
    updateLocationService,
    getLocationService,
};
