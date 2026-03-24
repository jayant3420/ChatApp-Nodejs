const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 3000;

const connectDB = async (retries = MAX_RETRIES) => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("mongodb connected successfully");
    } catch (error) {
        console.log(`mongodb connection error ==>> ${error.message}`);
        if (retries > 0) {
            console.log(`retrying connection... attempts left: ${retries}`);
            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
            return connectDB(retries - 1);
        } else {
            console.log("max retries reached. could not connect to mongodb.");
            process.exit(1);
        }
    }
};

module.exports = connectDB;