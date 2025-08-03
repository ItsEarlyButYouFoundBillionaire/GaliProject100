const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema(
    {
        full_name: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+(-?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email address",
            ],
        },

        phone_number: {
            type: String,
            required: [true, "Phone number is required"],
            unique: true,
            trim: true,
            match: [
                /^[6-9]\d{9}$/,
                "Please enter a valid 10-digit Indian phone number",
            ],
        },

        password_hash: {
            type: String,
            required: [true, "Password hash is required"],
            minlength: [32, "Password hash too short (must be hashed)"],
        },

        role: {
            type: String,
            enum: ["superadmin", "moderator", "support"],
            default: "moderator",
        },

        last_login: {
            type: Date,
        },

        is_active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

const Admin =
    mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

module.exports = Admin;