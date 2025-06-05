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