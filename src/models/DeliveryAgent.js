const mongoose = require('mongoose');

const DeliveryAgentSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
    },
    phone_number: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    govt_id_proof: {
        type: {
            type: String, // Aadhaar, PAN, etc.
            required: true,
        },
        id_number: {
            type: String,
            required: true,
        },
    },
    current_location: {
        latitude: { type: Number },
        longitude: { type: Number },
    },
    assigned_orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
        },
    ],
    ratings_feedback: {
        average_rating: { type: Number, default: 0 },
        total_ratings: { type: Number, default: 0 },
        complaints: [{ type: String }],
        successful_deliveries: { type: Number, default: 0 },
        on_time_percentage: { type: Number, default: 0 },
    },
    availability_status: {
        type: String,
        enum: ["available", "busy", "offline", "onBreak"],
        default: "offline",
    },
    last_active: {
        type: Date, // ❗ You had String — should be Date
        default: Date.now,
    },
    vehicle_type: {
        type: String,
        enum: ["bike", "car", "walk"],
        required: true,
    },
    preferred_areas: [String], // Optional field
    delivery_radius_km: {
        type: Number,
        default: 5, // optional default
    },
});

const DeliveryAgent =
    mongoose.models.DeliveryAgent || mongoose.model("DeliveryAgent", DeliveryAgentSchema);

    module.exports =DeliveryAgent;