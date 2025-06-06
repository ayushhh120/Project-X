const userModel = require('../models/user.model');
const blackListTokenModel = require('../models/blacklistToken.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const captainModel = require('../models/captain.model');


// Middleware to authenticate user using JWT
// This middleware checks if the user is authenticated by verifying the JWT token
module.exports.authUser = async (req, res, next) => {

    // Check for token in cookies or Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
   
    // Check if the token is blacklisted
    const isBlacklisted = await blackListTokenModel.findOne({ token: token }); 
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        req.user = user; 
        return next();

    } catch (error) {
        return res.status(401).json({ message: 'Invalid authentication token' });
    }
}

// Middleware to authenticate captain using JWT
module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        if (!captain) {
            return res.status(401).json({ message: 'Captain not found' });
        }
        req.captain = captain; 
        return next();

    } catch (error) {
        return res.status(401).json({ message: 'Invalid authentication token' });
    }
}