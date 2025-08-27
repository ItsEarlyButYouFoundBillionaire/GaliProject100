
const {
    placeOrderService,
    getOrdersByCustomerService,
    getOrdersByVendorService,
    getOrdersByDeliveryAgentService,
    updateOrderStatusService,
    cancelOrderService,
    getOrderByIdService,
} = require('../services/order.service');

// 1. Place order
const placeOrder = async (req, res) => {
    try {
        const order = await placeOrderService(req.body);

        // Dynamic summary for WhatsApp
        const summary = {
            items: order.order_items.map(i => `${i.name} x${i.quantity} = ₹${i.price * i.quantity}`),
            total: order.total_price,
        };

        res.status(200).json({
            success: true,
            message: 'Order placed successfully',
            order,
            summary, // <-- send order summary so WhatsApp can use it
        });
    } catch (error) {
        console.log('Error placing order:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// 2. Get orders by customer
const getOrdersByCustomers = async (req, res) => {
    try {
        const { id } = req.params;
        const orders = await getOrdersByCustomerService(id);
        res.status(200).json({
            success: true,
            count: orders.length,
            OrdersByCustomer: orders,
        });
    } catch (error) {
        console.log('Error fetching customer orders:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// 3. Get orders by vendor
const getOrderByVendor = async (req, res) => {
    try {
        const { id } = req.params;
        const orders = await getOrdersByVendorService(id);
        res.status(200).json({
            success: true,
            count: orders.length,
            ordersByVendor: orders,
        });
    } catch (error) {
        console.log('Error fetching vendor orders:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// 4. Get orders by delivery agent
const getOrderByDeliveryAgent = async (req, res) => {
    try {
        const { id } = req.params;
        const orders = await getOrdersByDeliveryAgentService(id);
        res.status(200).json({
            success: true,
            count: orders.length,
            ordersByDeliveryAgent: orders,
        });
    } catch (error) {
        console.log('Error fetching delivery agent orders:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// 5. Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { orderID } = req.params;
        const { status } = req.body;
        const updatedOrder = await updateOrderStatusService(orderID, status);
        res.status(200).json({
            success: true,
            message: 'Order status updated',
            order: updatedOrder,
        });
    } catch (error) {
        console.log('Error updating order status:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// 6. Cancel order
const cancelOrder = async (req, res) => {
    try {
        const { orderID } = req.params;
        const order = await cancelOrderService(orderID);
        res.status(200).json({
            success: true,
            message: 'Order cancelled',
            order,
        });
    } catch (error) {
        console.log('Error cancelling order:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// 7. Get single order by ID
const getOrderById = async (req, res) => {
    try {
        const { orderID } = req.params;
        const order = await getOrderByIdService(orderID);
        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.log('Error fetching order by ID:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

module.exports = {
    placeOrder,
    getOrdersByCustomers,
    getOrderByVendor,
    getOrderByDeliveryAgent,
    updateOrderStatus,
    cancelOrder,
    getOrderById,
};
