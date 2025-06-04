const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');
const blackListTokenModel = require('../models/blacklistToken.model');


module.exports.registerUser = async (req, res, next) => {
      const errors = validationResult(req); 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {fullname, email, password} = req.body;
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });
    if(!user) {
        return res.status(400).json({ message: 'User registration failed' });
    }
    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
}

// This function handles user login by validating the input,
//checking the user's credentials, and returning a token if successful.

module.exports.loginUser = async (req, res, next) => {
    // Validate the request body using express-validator
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract email and password from the request body
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');
    if(!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await user.comparePassword(password);
    // Check if the provided password matches the stored hashed password
    if(!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    // If the credentials are valid, generate an authentication token
    const token = user.generateAuthToken();

    // Return the token and user information in the response
    res.cookie('token', token)

    res.status(200).json({ token, user });
}


// This function retrieves the user profile based on the
//  user ID extracted from the request object.

module.exports.getUserProfile = async (req, res, next) => {
    
    res.status(200).json(req.user);

}

module.exports.logoutUser = async (req, res, next) => {
    // Clear the authentication token from the user's session
    res.clearCookie('token');

    // Optionally, you can also blacklist the token to prevent further use
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    // Check if the token exists
    await blackListTokenModel.create({ token });
    
    // Return a success message indicating that the user has been logged out
    res.status(200).json({ message: 'User logged out successfully' });

}