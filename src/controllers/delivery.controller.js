// const DeliveryAgent = require('../models/DeliveryAgent');
// const Order = require('../models/Order');
//
// // register the delivery agent
// const registerDeliveryAgent = async (req,res)=>{
//     try{
//         const{first_name, last_name, phone_number, govt_id_proof, vehicle_type } = req.body;
//         //chcking that all the fields must be filled
//         if(!first_name || !last_name || !phone_number || !govt_id_proof || !vehicle_type){
//             return res.status(400).json({message:"All required fields must be provided"})
//         }
//         //checking if the delivery agent is already registered
//         const existing = await DeliveryAgent.findOne({phone_number})
//         if(existing){
//             return res.status(409).json({message:"Delivery agent already registered with this phone number"});
//         }
//         //saving the delivery agent into the database
//         const newAgent = new DeliveryAgent(req.body);
//         await newAgent.save();
//
//         res.status(201).json({
//             message:"Delivery agent registered succesfully",agent:newAgent
//         });
//
//     }catch(error){
//         res.status(500).json({message:"Internal server error",error:error.message})
//     }
// };
//
// //get all the delivery agents
//
// const getAllDeliveryAgents = async (req,res)=>{
//     try{
//         const allDeliveryAgents = await DeliveryAgent.find().sort({last_active:-1});
//         return res.status(200).json(allDeliveryAgents)
//     }catch(error){
//         return res.status(500).json({message:"Error fetching the agents",error:error.message});
//     }
// };
// // get delivery agents by id
// const getDeliveryAgentById = async (req,res)=>{
//     try{
//         const agent = await DeliveryAgent.findById(req.params.id);
//         //checking if the agent exist or not
//         if(!agent){
//             return res.status(404).json({message:"Agent not found"})
//         }
//         res.status(200).json(agent)
//     }catch(error){
//         return  res.status(500).json({message:"Error fetching the agent",error:error.message})
//     }
// };
//
// //update the delivery agent location
// const updateDeliveryAgentLocation = async (req,res)=>{
//     try {
//         const { latitude, longitude } = req.body;
//         const agent = await DeliveryAgent.findByIdAndUpdate(
//             req.params.id,
//             { current_location: { latitude, longitude }, last_active: Date.now() },
//             { new: true }
//         );
//         if (!agent) return res.status(404).json({ message: "Agent not found" });
//         res.status(200).json({ message: "Location updated", agent });
//     } catch (error) {
//         res.status(500).json({ message: "Error updating location", error: error.message });
//     }
// };
// //updating the availablity status
// const updateAvailabilityStatus = async (req,res)=>{
//     try{
//         const { availability_status } = req.body;
//         const validStatus = ["available","offline","busy","onBreak"]
//         if(!validStatus.includes(availability_status)) {
//             return res.status(400).json({message:"Invalid Availability status"})
//         }
//         const agent = await DeliveryAgent.findByIdAndUpdate(
//             req.params.id,
//             {availability_status},
//             {new: true}
//         )
//         if(!agent) {
//             return res.status(404).json({message: "Agent not found"})
//         }
//         res.status(200).json({message:"Status updated",agent})
//     }catch(error){
//         return res.status(500).json({message:"Error updating the status",error:error.message})
//     }
// };
// //assign orders to the agent
// const assignOrderToAgent = async (req, res) =>{
//     try{
//         const {orderId} = req.body;
//         const agent = await DeliveryAgent.findById(req.params.id);
//         const order = await Order.findById(orderId);
//
//         if(!agent|| !order){
//             return res.status(404).json({message:"Agent or order not found"})
//         }
//         agent.assigned_orders.push(order._id);
//         agent.availability_status = "busy";
//         await agent.save();
//
//         res.status(200).json({message:"Order assigned",agent})
//
//     }catch(error){
//         return res.status(500).json({message:"Error assigning order",error:error.message})
//     }
// };
// //cancel the order
// const removeOrderFromAgent = async (req, res) => {
//     try {
//         const { orderId } = req.body;
//         const agent = await DeliveryAgent.findById(req.params.id);
//
//         if (!agent) return res.status(404).json({ message: "Agent not found" });
//
//         agent.assigned_orders = agent.assigned_orders.filter(id => id.toString() !== orderId);
//
//         if (agent.assigned_orders.length === 0) {
//             agent.availability_status = "available";
//         }
//
//         await agent.save();
//         res.status(200).json({ message: "Order removed", agent });
//     } catch (error) {
//         res.status(500).json({ message: "Error removing order", error: error.message });
//     }
// };
//
// //removing a delivery agent
// const removeDeliveryAgent = async (req, res) => {
//     try {
//         const agent = await DeliveryAgent.findByIdAndDelete(req.params.id); // ✅ Corrected function name and usage
//         if (!agent) {
//             return res.status(404).json({ message: "No agent was found" });
//         }
//         res.status(200).json({ message: "Delivery agent removed successfully" }); // ❌ You forgot `()` on `json`
//     } catch (error) {
//         return res.status(500).json({ message: "Error removing agent", error: error.message });
//     }
// };
// module.exports = {
//     registerDeliveryAgent,
//     getAllDeliveryAgents,
//     getDeliveryAgentById,
//     updateDeliveryAgentLocation,
//     updateAvailabilityStatus,
//     assignOrderToAgent,
//     removeOrderFromAgent,
//     removeDeliveryAgent,
// };
const {
    registerDeliveryAgentService,
    getAllDeliveryAgentsService,
    getDeliveryAgentByIdService,
    updateDeliveryAgentLocationService,
    updateAvailabilityStatusService,
    assignOrderToAgentService,
    removeOrderFromAgentService,
    removeDeliveryAgentService,
} = require('../services/delivery.service');

const registerDeliveryAgent = async (req, res) => {
    try {
        const agent = await registerDeliveryAgentService(req.body);
        res.status(201).json({ message: 'Delivery agent registered successfully', agent });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getAllDeliveryAgents = async (req, res) => {
    try {
        const agents = await getAllDeliveryAgentsService();
        res.status(200).json(agents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the agents', error: error.message });
    }
};

const getDeliveryAgentById = async (req, res) => {
    try {
        const agent = await getDeliveryAgentByIdService(req.params.id);
        if (!agent) return res.status(404).json({ message: 'Agent not found' });
        res.status(200).json(agent);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the agent', error: error.message });
    }
};

const updateDeliveryAgentLocation = async (req, res) => {
    try {
        const agent = await updateDeliveryAgentLocationService(req.params.id, req.body);
        if (!agent) return res.status(404).json({ message: 'Agent not found' });
        res.status(200).json({ message: 'Location updated', agent });
    } catch (error) {
        res.status(500).json({ message: 'Error updating location', error: error.message });
    }
};

const updateAvailabilityStatus = async (req, res) => {
    try {
        const agent = await updateAvailabilityStatusService(req.params.id, req.body.availability_status);
        if (!agent) return res.status(404).json({ message: 'Agent not found' });
        res.status(200).json({ message: 'Status updated', agent });
    } catch (error) {
        res.status(500).json({ message: 'Error updating the status', error: error.message });
    }
};

const assignOrderToAgent = async (req, res) => {
    try {
        const agent = await assignOrderToAgentService(req.params.id, req.body.orderId);
        if (!agent) return res.status(404).json({ message: 'Agent or order not found' });
        res.status(200).json({ message: 'Order assigned', agent });
    } catch (error) {
        res.status(500).json({ message: 'Error assigning order', error: error.message });
    }
};

const removeOrderFromAgent = async (req, res) => {
    try {
        const agent = await removeOrderFromAgentService(req.params.id, req.body.orderId);
        if (!agent) return res.status(404).json({ message: 'Agent not found' });
        res.status(200).json({ message: 'Order removed', agent });
    } catch (error) {
        res.status(500).json({ message: 'Error removing order', error: error.message });
    }
};

const removeDeliveryAgent = async (req, res) => {
    try {
        const removed = await removeDeliveryAgentService(req.params.id);
        if (!removed) return res.status(404).json({ message: 'No agent was found' });
        res.status(200).json({ message: 'Delivery agent removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing agent', error: error.message });
    }
};

module.exports = {
    registerDeliveryAgent,
    getAllDeliveryAgents,
    getDeliveryAgentById,
    updateDeliveryAgentLocation,
    updateAvailabilityStatus,
    assignOrderToAgent,
    removeOrderFromAgent,
    removeDeliveryAgent,
};
