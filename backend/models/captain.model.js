const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({

    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'Firstname must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minlength: [3, 'Lastname must be at least 3 characters long'],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
        lowercase: true, // Store email in lowercase
        matches: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address'],
        minlength: [5, 'Email must be at least 5 characters long'],
    },
    password: {
        type: String,
        required: true,
        select: false, // Exclude password from queries by default
    },
    socketID: {
        type: String
    },
    // check the status of captain whether it is active or inactive
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },

    vehicle: {
        color:{
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long'],
        },
        plate:{
            type: String,
            required: true,
            unique: true, // Ensure plate is unique
            minlength: [3, 'Plate must be at least 3 characters long'],
        },
        capacity:{
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1'],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto'], 
        }
        
    },

    location:{
        latitude: {
            type: Number,
    },
        longitude: {
            type: Number,
        }
    }
})

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
  return token;
}

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;
