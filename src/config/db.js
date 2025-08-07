const mongoose = require('mongoose');
const { DB_URI } = require('./env');

const connectDb = async ()=>{
    try{
        await mongoose.connect(DB_URI);
        console.log("MongoDB has connected successfully");
    }catch (error){
        console.log("MongoDB connection error",error.message);
        process.exit(1);//this is used to exit the app when the database is not connected
    }
};
module.exports = connectDb();
