const cron = require('node-cron'); // Correct cron package
const Vendor = require('../models/Vendor');
const Order = require('../models/Order');
const sendWhatsappMessage = require('../services/whatsapp.service');
const logger = require('../utils/logger');

const notificationJob = () => {
    cron.schedule('0 22 * * *', async () => {// here this is how this line works *    *    *    *    *
        //so this means this will send them the notification at 10 pm       // min  hour day  month day-of-week

        logger.info('Starting daily notification job...');

        try {
            const vendors = await Vendor.find();

            for (const vendor of vendors) {//this line picks up the vendor one by one
                const todayOrders = await Order.find({
                    vendor: vendor._id,
                    createdAt: {
                        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                        $lte: new Date(),
                    },
                });

                const totalOrders = todayOrders.length;
                const totalEarnings = todayOrders.reduce((sum, o) => sum + o.total_amount, 0);

                await sendWhatsappMessage(vendor.phone, ` Today you had ${totalOrders} orders and earned ₹${totalEarnings}.`);

                logger.info(`Notification sent to ${vendor.name}`);
            }

            logger.info('Daily notifications completed.');
        } catch (error) {
            logger.error('Notification job failed:', error);
        }
    });
};

module.exports = { notificationJob };
