const DeliveryAgent = require('../models/DeliveryAgent');
const generateOTP = require('../utils/generateOTP');
const sendOTP = require('../services/whatsapp.service');
const jwt = require('jsonwebtoken');

const otpStore = {}; // In-memory OTP store

// 1. Send OTP
const loginDeliveryAgentWithPhone = async (req, res) => {
    try {
        const { phone_number } = req.body;

        if (!phone_number) { a
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

// 2. Verify OTP
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

module.exports = {
    loginDeliveryAgentWithPhone,
    verifyDeliveryAgentOTP,
};
