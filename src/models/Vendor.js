const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    stall_name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },
    contact_number: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^[6-9]\d{9}$/, "Invalid phone number"],
    },

    operating_hours: {
        opening: { type: String, required: true }, // e.g., "09:00"
        closing: { type: String, required: true }, // e.g., "21:00"
    },

    menu_items: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            is_available: { type: Boolean, default: true },
        }
    ],

    ratings: {
        average: { type: Number, default: 0 },
        total_ratings: { type: Number, default: 0 },
    },

    active_status: {
        type: String,
        enum: ['active', 'notActive', 'outOfStock'],
        default: 'active',
    },

    images: [
        {
            url: String,
            description: String,
        }
    ],

    govt_id_proof: {
        type: {
            type: String,
            required: true, // Aadhaar, PAN, etc.
        },
        id_number: {
            type: String,
            required: true,
        },
    },

    order_history: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        }
    ],

    revenue_data: {
        daily: { type: Number, default: 0 },
        weekly: { type: Number, default: 0 },
        monthly: { type: Number, default: 0 },
    },

    commission_rate: {
        type: Number,
        default: 10, // e.g., 10%
    },

    delivery_radius_km: {
        type: Number,
        default: 5,
    },

    flag_count: {
        type: Number,
        default: 0,
    },

    performance_metrics: {
        order_success_rate: { type: Number, default: 100 },
        hygiene_rating: { type: Number, default: 5 },
        delay_complaints: { type: Number, default: 0 },
        conversion_rate: { type: Number, default: 0 },
    },

    last_updated: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Vendor = mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
