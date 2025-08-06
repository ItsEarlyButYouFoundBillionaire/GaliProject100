const DeliveryAgent = require('../models/DeliveryAgent');
const generateOTP = require('../utils/generateOTP');
const sendOTP = require('../services/whatsapp.service');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

const otpStore = {}; // In-memory OTP store

// ------------------------
// 1. Login for Delivery Agent (Send OTP)
// ------------------------
const loginDeliveryAgentWithPhone = async (req, res) => {
    try {
        const { phone_number } = req.body;

        if (!phone_number) {
            return res.status(400).json({ success: false, message: 'Phone number is required' });
        }

        const agent = await DeliveryAgent.findOne({ phone_number });

        if (!agent) {
            return res.status(404).json({ success: false, message: 'Delivery agent not found' });
        }

        const otp = generateOTP();
        const expiresAt = Date.now() + 5 * 60 * 1000;

        otpStore[phone_number] = { otp, expiresAt };

        await sendOTP(phone_number, otp);

        res.status(200).json({ success: true, message: 'OTP sent' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};

// ------------------------
// 2. Verify OTP for Delivery Agent
// ------------------------
const verifyDeliveryAgentOTP = async (req, res) => {
    try {
        const { phone_number, otp } = req.body;

        if (!phone_number || !otp) {
            return res.status(400).json({ success: false, message: 'Missing phone number or OTP' });
        }

        const record = otpStore[phone_number];

        if (!record || record.otp !== otp || Date.now() > record.expiresAt) {
            return res.status(401).json({ success: false, message: 'Invalid or expired OTP' });
        }

        delete otpStore[phone_number];

        const agent = await DeliveryAgent.findOne({ phone_number });

        const token = jwt.sign(
            { id: agent._id, role: 'delivery' },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({ success: true, token, agent });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};

// ------------------------
// 3. Login Admin (Email + Password)
// ------------------------
const loginAdmin = async (req, res) => {
    const email = req.body.email || req.body.Email;
    const password = req.body.password || req.body.Password;

    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required",
            received: { email: !!email, password: !!password }
        });
    }

    try {
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const isMatch = await bcrypt.compare(password, admin.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const sessionExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
        await Admin.findByIdAndUpdate(admin._id, {
            last_login: new Date(),
        });

        res.cookie('admin_token', admin._id.toString(), {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.status(200).json({
            message: `Welcome ${admin.full_name}`,
            email: admin.email
        });

    } catch (err) {
        console.error("Admin Login Error:", err);
        res.status(500).json({ message: "Server error during login" });
    }
};

// ------------------------
// 4. Logout Admin
// ------------------------
const logoutAdmin = async (req, res) => {
    try {
        res.clearCookie('admin_token');
        res.status(200).json({ message: "Admin logged out successfully" });
    } catch (err) {
        console.error("Admin Logout Error:", err);
        res.status(500).json({ message: "Server error during logout" });
    }
};

module.exports = {
    loginDeliveryAgentWithPhone,
    verifyDeliveryAgentOTP,
    loginAdmin,
    logoutAdmin,
};
