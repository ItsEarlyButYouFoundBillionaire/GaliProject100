const Customer = require('../models/Customer')
const Vendor = require('../models/Vendor')

//controller for getting nearby vendors

const getNearbyVendors = async (req,res)=>{
    try{
        const { latitude, longitude }= req.body;// extracted from WhatsApp API webhook

        if(!latitude||!longitude){
            return res.status(400).json({message:"Location coordinates are required"})
        }

        const radiusInKm = 3; // example: 3km radius
        //// How far we want to search around a location (5 kilometers)
        const radiusInRadians = radiusInKm / 6378.1; // Earth's radius in km
        //// Convert that distance into radians to use in map geolocation calculations

        //finding the nearby vendors
        const nearbyVendors = await Vendor.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[longitude, latitude], radiusInRadians],
                },
            },
        })
        res.status(200).json({
            success:true,
            count:nearbyVendors.length,
            vendors:nearbyVendors,

        });


    }catch(error){
        console.log("Error fetching the nearby vendors",error)
        return res.status(500).json({message:"There was a server error while fetching your location"})
    }
}

module.exports = {
    getNearbyVendors,
};