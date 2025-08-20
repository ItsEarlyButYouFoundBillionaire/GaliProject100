// const Order = require('../models/Order')
// const Customer = require('../models/Customer')
// const Vendor = require('../models/Vendor')
// const DeliveryAgent = require('../models/DeliveryAgent')
//
// //controller for placing an order
//
// const placeOrder = async (req,res)=>{
//     try{
//         const {
//             customerID,
//             vendorID,
//             order_items,            // ✅ Matches schema
//             total_price,            // ✅ Matches schema
//             delivery_distance_km,   // ✅ Matches schema
//             delivery_address,
//             packaging_charge = 0,
//             promo_code_applied = null,
//         } = req.body;
//
//
//         //creating a new order
//         const newOrder = await Order.create({
//             customer: customerID,
//             vendor: vendorID,
//             order_items,
//             total_price,
//             delivery_distance_km,
//             delivery_address,
//             packaging_charge,
//             promo_code_applied,
//             status: "placed", // ✅ FIXED: was 'PLACED', corrected to lowercase 'placed' to match enum
//         });
//         res.status(200).json({
//             success:true,
//             message:"Order placed successfully",
//             order:newOrder
//         });
//     }catch (error){
//         console.log("There has been some error while creating the order",error);
//         res.status(500).json({success:false,message:"server error"});
//     }
// };
//
// //getting all the orders of the customer
//
//
// const order = async (req, res)=>{
//     try{
//         const {id} = req.params;
//
//         const OrdersByCustomer = await Order.find({customer:id}).populate('vendor');//Instead of just returning the vendor's ObjectId in the order, go and fetch the actual vendor document and include it
//
//         res.status(200).json({
//             success:true,
//             count:OrdersByCustomer.length,
//             OrdersByCustomer,
//         });
//     }catch(error){
//         console.log("Fetch order Error" , error);
//         res.status(500).json({success:false,message:"Server error"})
//     }
// };
// // getting all the orders form the vendor
// const getOrderByVendor = async (req,res)=>{
//     try{
//         const {id}= req.params
//
//         const ordersByVendor = await Order.find({vendor:id}).populate('customer');
//
//         res.status(200).json({
//             success:true,
//             count:ordersByVendor.length,
//             ordersByVendor
//         });
//
//     }catch(error){
//         console.log("Fetch order Error",error);
//         res.status(500).json({success:false,message:"Server error"})
//     }
// };
// //get orders by delivery agent
//
// const getOrderByDeliveryAgent = async (req,res)=>{
//     try{
//         const {id }= req.params;
//
//         const ordersByDeliveryAgent = await Order.find({delivery_agent:id});
//         res.status(200).json({
//             success:true,
//             count:ordersByDeliveryAgent,
//             ordersByDeliveryAgent
//         });
//     }catch(error){
//         console.log("Fetch order Error",error);
//         res.status(500).json({success:false,message:"Server error"})
//     }
// };
// //updating the orders status (e.g., pending → accepted → delivered)
//
//  const updateOrderStatus = async (req, res)=>{
//     try{
//         const {orderID}= req.params;
//         const {status } = req.body;
//
//         const updatedOrder = await Order.findByIdAndUpdate(
//             orderID,
//             {status},
//             {new:true}
//         );
//         res.status(200).json({
//             sucess:true,
//             message:"Order status updated",
//             order:updatedOrder
//         })
//     }catch(error){
//         res.status(500).json({
//             success:false,
//             message:"Server error",
//             error:error.message
//         })
//     }
// };
// //Cancel order
//
// const cancelOrder = async (req,res)=>{
//     try{
//         const {orderID}=req.params;
//
//         const order = await Order.findByIdAndUpdate(orderID,{status:'cancelled'},{new:true});
//         res.status(200).json({
//             success:true,
//             message:"Order cancelled",
//             order
//         })
//     }catch (err) {
//         res.status(500).json({ success: false, message: 'Server error', error: err.message });
//     }
// };
// // 7. Get Single Order by ID (Optional)
//  const getOrderById = async (req, res) => {
//     try {
//         const { orderID } = req.params;
//
//         const order = await Order.findById(orderID)
//             .populate('vendor')
//             .populate('customer')
//             .populate('delivery_agent');
//
//         res.status(200).json({
//             success: true,
//             order,
//         });
//     } catch (err) {
//         res.status(500).json({ success: false, message: 'Server error', error: err.message });
//     }
// };
// // Export all controllers
// module.exports = {
//     placeOrder,
//     getOrdersByCustomers: order,
//     getOrderByVendor,
//     getOrderByDeliveryAgent,
//     updateOrderStatus,
//     cancelOrder,
//     getOrderById,
// };
const OrderService = require('../services/order.service')
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
