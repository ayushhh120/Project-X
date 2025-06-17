const express = require('express');
const router = express.Router();
const {body}= require('express-validator');
const rideController = require('../controllers/rides.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/create',
   authMiddleware.authUser,
    body('pickup').isString().isLength({min: 3}).withMessage('Pickup location must be at least 3 characters long'),
    body('destination').isString().isLength({min: 3}).withMessage('Destination must be at least 3 characters long'),
    body('vehicleType').isString().isIn(['auto', 'car', 'motorcycle']).withMessage('Vehicle type must be one of: auto, car, motorcycle'),
    rideController.createRide

 )




module.exports = router;