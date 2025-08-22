// Handles webhook events and flow logic

const VendorService = require('../services/vendor.service');
const OrderService = require('../services/order.service');
const WhatsappService = require('../services/whatsapp.service');

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
        }else{
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