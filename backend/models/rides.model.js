const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    captain:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    fare:{
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'completed', 'cancelled'],
        default: 'pending'},
    duration: {
        type: Number,
        default: 0  // Duration in seconds
    },
    distance: {
        type: Number,
        default: 0  // Distance in meters
    },
    paymentId:{
        type: String,
    },
    orderId:{
        type: String,
    },
    signature:{
        type: String,
    }, 
    otp:{
        type: String,
        required: true,
        selected: false, // Omit OTP from queries by default
    }
})

module.exports = mongoose.model('ride', rideSchema);