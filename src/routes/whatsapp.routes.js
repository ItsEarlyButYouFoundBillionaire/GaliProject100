// src/routes/whatsapp.routes.js

const express = require("express");
const router = express.Router();
const whatsappController = require("../controllers/whatsapp.controller");

// WhatsApp webhook verification (GET)
router.get("/webhook", whatsappController.verifyWebhook);

// WhatsApp webhook callback (POST) - incoming messages/events
router.post("/webhook", whatsappController.handleWebhook);

// Send test message to a user
router.post("/send", whatsappController.sendMessage);

// Send nearby stalls (interactive message)
router.post("/send/stalls", whatsappController.sendNearbyStalls);

// Send order confirmation
router.post("/send/order-confirmation", whatsappController.sendOrderConfirmation);

module.exports = router;
