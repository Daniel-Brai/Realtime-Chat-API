// dependencies
const mongoose = require("mongoose");
const { config } = require('dotenv')

// read environment variables
config()

// connect to mongoDB function
const connectDB = async() => { 
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log(`💾 [database]: Database connection established....`)
        })
        .catch((err) => {
            console.log(`😥 [database]: Database connection established....`);
            console.error(err);
        })
}

module.exports = { connectDB }

