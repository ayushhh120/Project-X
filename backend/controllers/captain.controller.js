const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const {validationResult} = require('express-validator');
const blackListTokenModel = require('../models/blacklistToken.model');  
    


// This function registers a new captain by validating the input,
module.exports.registerCaptain = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    // Extract captain details from the request body
    const { fullname, email, password, vehicle } = req.body;

    // Check if captain already exists
    const isCaptainAlreadyExists = await captainModel.findOne({ email });
    if (isCaptainAlreadyExists) {
        return res.status(400).json({ message: 'Captain already exists' });
    }
    const hashedPassword = await captainModel.hashPassword(password);
    
    // Create a new captain using the captain service
    try {
        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });

        if (!captain) {
            return res.status(400).json({ message: 'Captain registration failed' });
        }

        const token = captain.generateAuthToken();
        res.status(201).json({ token, captain });
    } catch (error) {
        next(error);
    }
}

// This function logs in a captain by validating the input and checking credentials
module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract email and password from the request body
    const { email, password } = req.body;

    // Find the captain by email
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    const isMatch = await captain.comparePassword(password,)
    
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
 } 

 const token = captain.generateAuthToken();
 res.cookie('token', token)
 res.status(200).json({ token, captain });
}

// This function retrieves the captain's profile information
module.exports.getCaptainProfile = async (req, res, next) => {
      res.status(200).json({ captain: req.captain });
}

// This function logs out the captain by blacklisting the token and clearing the cookie

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    await blackListTokenModel.create({ token });

    res.clearCookie('token');

    res.status(200).json({ message: 'Logged out successfully' });
}