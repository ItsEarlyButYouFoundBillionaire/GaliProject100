const cron = require('node-cron');
const Vendor = require('../models/Vendor');
const Order = require('../models/Order');
const logger  = require('../utils/logger');

const payoutJob = () => {
    cron.schedule('55 23 * * *', async () => {
        logger.info('Starting payout calculation job...');

        try {
            const vendors = await Vendor.find();

            for (const vendor of vendors) {
                const todayOrders = await Order.find({
                    vendor: vendor._id,
                    status: 'delivered',
                    createdAt: {
                        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                        $lte: new Date(),
                    },
                });

                const totalEarnings = todayOrders.reduce((sum, o) => sum + o.total_amount, 0);

                logger.info(`Vendor ${vendor.name} earned ₹${totalEarnings} today.`);
            }

            logger.info('Payout calculation completed.');
        } catch (error) {
            logger.error('Payout job failed:', error);
        }
    });
};

module.exports = { payoutJob };
