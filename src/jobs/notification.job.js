const cron = require('cron');
const vendor = require('../models/Vendor');
const order = require('../models/Order');
const sendWhatsappMessage = require('../services/whatsapp.service');
const logger = require('../utils/logger');

// Runs daily at 9:00 PM
const notificationJob = () => {
    cron.schedule('0 21 * * *', async () => {
        logger.info('Starting daily notification job...');

        try {
            const vendors = await Vendor.find();

            for (const vendor of vendors) {
                // Calculate today's stats
                const todayOrders = await Order.find({
                    vendor: vendor._id,
                    createdAt: {
                        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                        $lte: new Date(),
                    },
                });

                const totalOrders = todayOrders.length;
                const totalEarnings = todayOrders.reduce((sum, order) => sum + order.total_amount, 0);

                // Send WhatsApp summary (template message later)
                await sendWhatsAppMessage(vendor.phone, `📊 Today you had ${totalOrders} orders and earned ₹${totalEarnings}.`);

                logger.info(`Notification sent to ${vendor.name}`);
            }

            logger.info('Daily notifications completed.');
        } catch (error) {
            logger.error('Notification job failed:', error);
        }
    });
};
module.exports = {
    notificationJob,
}