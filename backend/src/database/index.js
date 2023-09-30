const mongoose = require("mongoose");
const dotenv = require ('dotenv');

dotenv.config();
const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connect to database successfully")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    connectToDb
}