const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        lowercase: true,
        trim: true,
        unique:true,
        required:true,
    },
    phone_Number:{
        type:String,
        unique:true,
        required:true,
    },
    current_location: {
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
        address_description: {
            type: String, // like "near temple"
        },
    },
    saved_addresses: [
        {
            label: { type: String }, // "Home", "Office"
            latitude: { type: Number },
            longitude: { type: Number },
            description: { type: String },
        },
    ],
    orders:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
        }
    ],
    is_banned: {
        type: Boolean,
        default: false,
    },

    created_at: {
        type: Date,
        default: Date.now,
    },

    last_active: {
        type: Date,
        default: Date.now,
    },


});
const Customer = mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);

module.exports =Customer;