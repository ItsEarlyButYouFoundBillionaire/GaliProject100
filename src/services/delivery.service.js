const DeliveryAgent = require('../models/DeliveryAgent');
const Order = require('../models/Order');

const registerDeliveryAgentService = async (data) => {
    return await DeliveryAgent.create(data);
};

const getAllDeliveryAgentsService = async () => {
    return await DeliveryAgent.find();
};

const getDeliveryAgentByIdService = async (id) => {
    return await DeliveryAgent.findById(id);
};

const updateDeliveryAgentLocationService = async (id, locationData) => {
    return await DeliveryAgent.findByIdAndUpdate(
        id,
        { location: locationData },
        { new: true }
    );
};

const updateAvailabilityStatusService = async (id, availability_status) => {
    return await DeliveryAgent.findByIdAndUpdate(
        id,
        { availability_status },
        { new: true }
    );
};

const assignOrderToAgentService = async (agentId, orderId) => {
    const agent = await DeliveryAgent.findById(agentId);
    const order = await Order.findById(orderId);
    if (!agent || !order) return null;

    agent.assigned_orders.push(orderId);
    await agent.save();

    order.status = 'assigned';
    order.delivery_agent = agentId;
    await order.save();

    return agent;
};

const removeOrderFromAgentService = async (agentId, orderId) => {
    const agent = await DeliveryAgent.findById(agentId);
    if (!agent) return null;

    agent.assigned_orders = agent.assigned_orders.filter(
        (id) => id.toString() !== orderId
    );
    await agent.save();

    await Order.findByIdAndUpdate(orderId, {
        status: 'pending',
        delivery_agent: null,
    });

    return agent;
};

const removeDeliveryAgentService = async (id) => {
    const result = await DeliveryAgent.findByIdAndDelete(id);
    return result ? true : false;
};
//function for assigning available agent;

const assignAgent = async (orderId, agentId) => {
    // Step 1: Find the delivery agent by ID
    const agent = await DeliveryAgent.findById(agentId);
    if (!agent) {
        throw new Error("Delivery agent not found");
    }

    // Step 2: Check if the agent is available
    if (agent.is_available === false) {
        throw new Error("Delivery agent is not available");
    }

    // Step 3: Find the order
    const order = await Order.findById(orderId);
    if (!order) {
        throw new Error("Order not found");
    }

    // Step 4: Update order with assigned agent
    order.assigned_agent = agent._id;
    order.status = "ASSIGNED"; // you can change status naming if needed
    await order.save();

    // Step 5: Update agent availability
    agent.is_available = false;
    await agent.save();

    // Step 6: Return updated order
    return order;
};

module.exports = {
    assignAgent,
    registerDeliveryAgentService,
    getAllDeliveryAgentsService,
    getDeliveryAgentByIdService,
    updateDeliveryAgentLocationService,
    updateAvailabilityStatusService,
    assignOrderToAgentService,
    removeOrderFromAgentService,
    removeDeliveryAgentService,
};
