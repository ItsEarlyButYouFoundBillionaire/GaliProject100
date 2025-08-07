//this will be used by admin adn the delivery agents

module.exports = function isAuthenticated(req,res,next){
    try{
        if(!req.session||!req.session.user){
            return res.status(401).json({
                success:false,
                message:"Unauthorized: No session found"
            });
        }

        req.user = req.session.user;
        next();
    }catch(error){
        console.error('Error in isAuthenticated middleware:', err);
        res.status(500).json({
            success:false,
            message:"Internal Server error"
        });
    }
};