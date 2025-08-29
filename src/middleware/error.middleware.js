// middleware/error.middleware.js
module.exports = function errorMiddleware(err, req, res, next) {
    console.error("Global Error Handler:", err);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};
