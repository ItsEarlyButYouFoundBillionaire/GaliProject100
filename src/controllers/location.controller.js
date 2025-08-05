// controllers/location.controller.js
const {
    updateLocationService,
    getLocationService,
} = require("../services/location.service");

/**
 * Controller for delivery agent to update their live location.
 */
const updateLocation = async (req, res) => {
    try {
        const { delivery_agent_id, latitude, longitude } = req.body;

        if (!delivery_agent_id || !latitude || !longitude) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }

        const location = await updateLocationService({ delivery_agent_id, latitude, longitude });
        return res.status(200).json({
            success: true,
            message: "Location updated successfully",
            data: location,
        });
    } catch (error) {
        console.error("Error updating location:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

/**
 * Controller to fetch the delivery agent's live location.
 */
const getLocation = async (req, res) => {
    try {
        const { agentId } = req.params;
        const location = await getLocationService(agentId);

        if (!location) {
            return res.status(404).json({
                success: false,
                message: "Location not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Location fetched successfully",
            data: location,
        });
    } catch (error) {
        console.error("Error fetching location:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = {
    updateLocation,
    getLocation,
};




// const LiveLocation = require("../models/LiveLocation");
// const DeliveryAgent = require("../models/DeliveryAgent");
//
// /**
//  * Delivery agent updates their current location.
//  */
// const updateLocation = async (req, res) => {
//     try {
//         const { delivery_agent_id, latitude, longitude } = req.body;
//
//         if (!delivery_agent_id || !latitude || !longitude) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Missing required fields",
//             });
//         }
//
//         // Upsert location (update if exists, create if not)
//         const location = await LiveLocation.findOneAndUpdate(
//             { delivery_agent: delivery_agent_id },
//             {
//                 coordinates: {
//                     latitude,
//                     longitude,
//                 },
//                 updated_at: Date.now(),
//             },
//             { new: true, upsert: true }
//         );
//
//         return res.status(200).json({
//             success: true,
//             message: "Location updated successfully",
//             data: location,
//         });
//     } catch (error) {
//         console.error("Error updating location:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error",
//         });
//     }
// };
//
// /**
//  * Get latest live location for a delivery agent (used in tracking map).
//  */
// const getLocation = async (req, res) => {
//     try {
//         const { agentId } = req.params;
//
//         const location = await LiveLocation.findOne({ delivery_agent: agentId }).populate("delivery_agent", "name phone_number");
//
//         if (!location) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Location not found",
//             });
//         }
//
//         return res.status(200).json({
//             success: true,
//             message: "Location fetched successfully",
//             data: location,
//         });
//     } catch (error) {
//         console.error("Error fetching location:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error",
//         });
//     }
// };
//
// module.exports = {
//     updateLocation,
//     getLocation,
// };
