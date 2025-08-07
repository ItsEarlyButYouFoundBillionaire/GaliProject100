const ROLES = {
    ADMIN:"admin",
    CUSTOMER:"customer",
    VENDOR:"vendor",
    DELIVERY_AGENT:"delivery_agent",
};
const ORDER_STATUS = {
    PENDING:"pending",
    ACCEPTED:"accepted",
    PREPARING:"preparing",
    READY:"ready",
    PICKED:"picked",
    DELIVERED:"delivered",
    CANCELLED:"cancelled"
};
const PAYMENT_STATUS ={
    PENDING:"pending",
    SUCCESS:"success",
    FAILED:"failed"
};
module.exports = {
    ROLES,
    ORDER_STATUS,
    PAYMENT_STATUS,
};