const mongoose = require("mongoose");

const liveLocationSchema = new mongoose.Schema(
    {
        delivery_agent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DeliveryAgent",
            required: true,
            unique: true, // One location per delivery agent
        },
        coordinates: {
            latitude: {
                type: Number,
                required: true,
            },
            longitude: {
                type: Number,
                required: true,
            },
        },
        updated_at: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("LiveLocation", liveLocationSchema);
