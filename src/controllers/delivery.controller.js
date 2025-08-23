
const {
    registerDeliveryAgentService,
    getAllDeliveryAgentsService,
    getDeliveryAgentByIdService,
    updateDeliveryAgentLocationService,
    updateAvailabilityStatusService,
    assignOrderToAgentService,
    removeOrderFromAgentService,
    removeDeliveryAgentService,
    assignAgent
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

//assigning agent
const assignAgent = async (req, res, next) => {
    try {
        const { orderId, agentId } = req.body;

        // Call service
        const updatedOrder = await deliveryService.assignAgent(orderId, agentId);

        // Send response
        res.status(200).json(success("Agent assigned successfully", updatedOrder));
    } catch (error) {
        next(error);
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
    assignAgent,
};
