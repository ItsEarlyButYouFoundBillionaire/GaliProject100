//Used to validate the incoming request body with Joi schema (or any validation schema)

// middlewares/validate.middleware.js

module.exports = function validate(schema) {
    return function (req, res, next) {
        try {
            const { error } = schema.validate(req.body);

            if (error) {
                return res.status(400).json({
                    success: false,
                    message: error.details[0].message,
                });
            }

            next();
        } catch (err) {
            console.error("Validation Middleware Error:", err);
            res.status(500).json({
                success: false,
                message: "Something went wrong during validation.",
            });
        }
    };
};
