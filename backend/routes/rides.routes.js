const express = require('express');
const router = express.Router();
const {body, query}= require('express-validator');
const rideController = require('../controllers/rides.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Create a new ride
router.post('/create',
   authMiddleware.authUser,
    body('pickup').isString().isLength({min: 3}).withMessage('Pickup location must be at least 3 characters long'),
    body('destination').isString().isLength({min: 3}).withMessage('Destination must be at least 3 characters long'),
    body('vehicleType').isString().isIn(['auto', 'car', 'motorcycle']).withMessage('Vehicle type must be one of: auto, car, motorcycle'),
    rideController.createRide
 )

 // Get all ride fare for a user
 router.get('/get-fare', 
   authMiddleware.authUser,
   query('pickup').isString().isLength({min: 3}).withMessage('Invalid pickup location'),
   query('destination').isString().isLength({min: 3}).withMessage('Invalid destination'),
   rideController.getFare
 )

// Confirm ride route for captain
 router.post('/confirm', authMiddleware.authCaptain,
  body('rideId').isMongoId().withMessage('Invalid ride Id'),
  rideController.confirmRide
 )



module.exports = router;

router.get('/start-ride', authMiddleware.authCaptain,
  query('rideId').isMongoId().withMessage('Invalid ride Id'),
  query('otp').isString().isLength({min: 6, max: 6}).withMessage('Invalid ride Id'),
  rideController.startRide
)

router.post('/end-ride', authMiddleware.authCaptain,
  body('rideId').isMongoId().withMessage('Invalid ride Id'),
  rideController.endRide
)