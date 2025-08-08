const cron = require('cron');
const vendor = require('../models/Vendor');
const order = require('../models/Vendor');
const logger  = require('../utils/logger');

// Runs daily at 11:55 PM
 const payoutJob = () => {
    cron.schedule('55 23 * * *', async () => {//
        logger.info('St payout calculation job...');

        try {
            // Get all vendors
            const vendors = await Vendor.find();

            for (const vendor of vendors) {
                // Calculate today's earnings
                const todayOrders = await Order.find({
                    vendor: vendor._id,
                    status: 'delivered',
                    createdAt: {
                        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                        $lte: new Date(),
                    },
                });

                const totalEarnings = todayOrders.reduce((sum, order) => sum + order.total_amount, 0);

                // Save payout summary somewhere or log for manual payout
                logger.info(`Vendor ${vendor.name} earned ₹${totalEarnings} today.`);

                // Optional: store in DB
                // await Payout.create({ vendor: vendor._id, amount: totalEarnings, date: new Date() });
            }

            logger.info('Payout calculation completed.');
        } catch (error) {
            logger.error('Payout job failed:', error);
        }
    });
};
module.exports = {
    payoutJob,
}
