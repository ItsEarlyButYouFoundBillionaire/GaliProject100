const sendSuccess = (res,message,data)=>{
    return res.status(200).json({
        success:true,
        message,
        data,
    });
};
const sendError = (res,message,statusCode)=>{
    return res.status(statusCode).json({
        success: false,
        message,
    });
};
module.exports = {
    sendError,
    sendSuccess,
};