// Handles webhook events and flow logic

const VendorService = require('../services/vendor.service');
const OrderService = require('../services/order.service');
const WhatsappService = require('../services/whatsapp.service');
const Order = require('../models/Order');

const handleInteractiveMessage = async (req,res)=>{
    try{
        const body = req.body;

        //extracting the customer phone number and interactive payload
        const customerPhone = body?.entry?.[0]?.changes?.[0]?.value?.contacts?.[0]?.wa_id;
        const interactive = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.interactive;

        if(!interactive){
            return res.status(404).json({success:false,message:"No interactive message found"})
        }
        //finding the interactive type and the id of the selected options
        const replyType = interactive.type; // "button_reply" or "list_reply"
        const selectedId =
            replyType === "button_reply"
                ? interactive.button_reply.id
                : interactive.list_reply.id;
        console.log("User:", customerPhone, "Selected:", selectedId);

        //deciding what to do based on the selected it
        if(selectedId==="Nearby_Stalls"){
            const stalls = await VendorService.getNearbyVendors (customerPhone);
            await WhatsappService.sendStallsList(customerPhone,stalls)
        }
        else if(selectedId.startsWith("Stalls_Menu")){
            const stallId = selectedId.split("STALL_MENU_")[1];
            const menu = await VendorService.getMenuByVendorId(stallId);
            await WhatsappService.sendStallMenu(customerPhone,menu);
        }
        else if (selectedId==="Order_summary"){
            const order = await OrderService.createOrderDraftService({
                customerID: customerPhone,
                vendorID: selectedVendorId,
                order_items: selectedItems,
                delivery_address: selectedAddress
            });
            await WhatsappService.sendOrderSummary(customerPhone,order)
        }
        else if (selectedId === "confirm_order"){ // 👈 added confirm order flow
            const draftOrder = await Order.findOne({ customer: customerPhone, status: "draft" });
            if(!draftOrder){
                await WhatsappService.sendTextMessage(customerPhone,"No draft order found to confirm.");
            } else {
                const placedOrder = await OrderService.placeOrderService({
                    customerID: draftOrder.customer,
                    vendorID: draftOrder.vendor,
                    order_items: draftOrder.order_items,
                    total_price: draftOrder.total_price,
                    delivery_distance_km: draftOrder.delivery_distance_km || 0,
                    delivery_address: draftOrder.delivery_address,
                    packaging_charge: draftOrder.packaging_charge,
                    promo_code_applied: draftOrder.promo_code_applied
                });
                await WhatsappService.sendTextMessage(customerPhone,` Order placed successfully! Your order ID is ${placedOrder._id}`);
            }
        }

        else{
            await WhatsappService.sendTextMessage(customerPhone,"Sorry, I did not understand that.");
        }
        return res.sendStatus(200)
    }catch(error){
        console.error("Error in handelInteractiveMessage",error);
        return res.status(500).json({success:false,error:error.message})
    }
}
module.exports ={
    handleInteractiveMessage
}