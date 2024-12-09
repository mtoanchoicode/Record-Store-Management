const mongoose = require("mongoose")

module.exports.connect = async ()=>{
    try{
        // Connect to database
        mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected")
    } catch(error) {
        console.log("Database timeout")
    }
}
