// this is also going to used when we want the features to be assigned based on their roles

module.exports = function authorizeRoles(...allowedRoles) {
    return function (req, res, next) {
        try {
            const user = req.user;

            if (!user || !allowedRoles.includes(user.role)) {
                return res.status(403).json({
                    success: false,
                    message: 'Forbidden: You do not have access to this resource',
                });
            }

            next();
        } catch (err) {
            console.error('Error in authorizeRoles middleware:', err);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        }
    };
};
