const mongoose = require('mongoose');

// This schema defines a model for storing blacklisted tokens in MongoDB.

const blacklistTokenSchema = new mongoose.Schema({
    token: { 
        type: String, 
        required: true, 
        unique: true 
    },        
    createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: 86400} // 24 hours TTL
});

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);