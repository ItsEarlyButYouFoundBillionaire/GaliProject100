const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Vendor = require('../models/Vendor');
const DeliveryAgent = require('../models/DeliveryAgent');

// 1. Place a new order
const placeOrderService = async ({
                                     customerID,
                                     vendorID,
                                     order_items,
                                     total_price,
                                     delivery_distance_km,
                                     delivery_address,
                                     packaging_charge = 0,
                                     promo_code_applied = null,
                                 }) => {
    const newOrder = await Order.create({
        customer: customerID,
        vendor: vendorID,
        order_items,
        total_price,
        delivery_distance_km,
        delivery_address,
        packaging_charge,
        promo_code_applied,
        status: 'placed',
    });
    return newOrder;
};
// 5. Create a draft order (before payment confirmation)
const createOrderDraftService = async ({
                                           customerID,
                                           vendorID,
                                           order_items,
                                           delivery_address,
                                           packaging_charge = 0,
                                           promo_code_applied = null,
                                       }) => {
    // calculate total from items
    const itemsTotal = order_items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const total_price = itemsTotal + packaging_charge;

    const draftOrder = await Order.create({
        customer: customerID,
        vendor: vendorID,
        order_items,
        total_price,
        delivery_address,
        packaging_charge,
        promo_code_applied,
        status: 'draft', // 👈 important difference
    });

    return draftOrder;
};


// 2. Get orders by customer
const getOrdersByCustomerService = async (id) => {
    return await Order.find({ customer: id }).populate('vendor');
};

// 3. Get orders by vendor
const getOrdersByVendorService = async (id) => {
    return await Order.find({ vendor: id }).populate('customer');
};

// 4. Get orders by delivery agent
const getOrdersByDeliveryAgentService = async (id) => {
    return await Order.find({ delivery_agent: id });
};

// 5. Update order status
const updateOrderStatusService = async (orderID, status) => {
    return await Order.findByIdAndUpdate(orderID, { status }, { new: true });
};

// 6. Cancel order
const cancelOrderService = async (orderID) => {
    return await Order.findByIdAndUpdate(orderID, { status: 'cancelled' }, { new: true });
};

// 7. Get single order by ID
const getOrderByIdService = async (orderID) => {
    return await Order.findById(orderID)
        .populate('vendor')
        .populate('customer')
        .populate('delivery_agent');
};

module.exports = {
    createOrderDraftService,
    placeOrderService,
    getOrdersByCustomerService,
    getOrdersByVendorService,
    getOrdersByDeliveryAgentService,
    updateOrderStatusService,
    cancelOrderService,
    getOrderByIdService,
};
