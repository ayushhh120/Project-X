const mongoose = require('mongoose');


async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_CONNECT);
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ Could not connect to MongoDB:", err.message);
       
    }
}

module.exports = connectDB;

