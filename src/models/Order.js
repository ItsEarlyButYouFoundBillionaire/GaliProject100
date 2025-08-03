
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,//The field will store an ID value (MongoDB ObjectId).
            ref: "Customer",//This ObjectId comes from the Vendor collection (i.e., model name)
            required: true,
        },

        vendor: {
            type: mongoose.Schema.Types.ObjectId,//The field will store an ID value (MongoDB ObjectId).
            ref: "Vendor",//This ObjectId comes from the Vendor collection (i.e., model name)
            required: true,
        },

        delivery_agent: {
            type: mongoose.Schema.Types.ObjectId,//The field will store an ID value (MongoDB ObjectId).
            ref: "DeliveryAgent",//This ObjectId comes from the Vendor collection (i.e., model name)
            default: null, // can be assigned later
        },

        order_items: [
            {
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true }, // price per item
            },
        ],

        total_price: {
            type: Number,
            required: true,
        },

        promo_code_applied: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PromoCode",
            default: null,
        },

        packaging_charge: {
            type: Number,
            default: 0,
        },

        delivery_distance_km: {
            type: Number,
            required: true,
        },

        delivery_address: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: [
                "placed",
                "accepted",
                "preparing",
                "out_for_delivery",
                "delivered",
                "cancelled",
            ],
            default: "placed",
        },

        order_time: {
            type: Date,
            default: Date.now,
        },

        delivery_time: {
            type: Date, // will be filled when marked as delivered
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

const Order =
    mongoose.models.Order || mongoose.model("Order", OrderSchema);

module.exports =Order;