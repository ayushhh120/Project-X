const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');


// first we need to validate the data that will be fetched by frontend whether it is correct data or not
const{body} = require("express-validator");

// this is methods of express-validator that we can use to validate the data
router.post('/register',
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('Firstname must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    userController.registerUser
)

// this is the login route where we will validate the data that will be fetched by frontend whether it is correct data or not
router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.loginUser) 


// This route is used to get the user profile
router.get('/profile', authMiddleware.authUser, userController.getUserProfile);

// this route is used to logout the user
router.get('/logout', authMiddleware.authUser, userController.logoutUser);




module.exports = router;