const rideModel = require('../models/rides.model');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const crypto = require('crypto');


// this functions calculates the fare based on pickup and destination locations
async function getFare(pickup, destination) {
   if (!pickup || !destination) {
      throw new Error('Pickup and destination are required to calculate fare');
   }
   const distanceTime = await mapService.getDistanceTime(pickup, destination);

const baseFare = {
    auto: 30,
    car: 50,
    motorcycle: 20
};
const perKmRate = {
    auto: 12,
    car: 18,
    motorcycle: 10
};

const fare = {
    auto: Math.round(baseFare.auto + (distanceTime.distance * perKmRate.auto) + (distanceTime.duration / 60) * 2), // Adding a time component

    car: Math.round(baseFare.car + (distanceTime.distance * perKmRate.car) + (distanceTime.duration / 60) * 3), // Adding a time component

    motorcycle: Math.round(baseFare.motorcycle + (distanceTime.distance * perKmRate.motorcycle) + (distanceTime.duration / 60) * 1) // Adding a time component
};
return fare;
}

module.exports.getFare = getFare;

// This function generates a random OTP of specified length
function getOtp(num) {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < num; i++) {
        const idx = crypto.randomInt(0, digits.length);
        otp += digits[idx];
    }
    return otp;
}

// This function creates a new ride in the database
module.exports.createRide = async ({user, pickup, destination, vehicleType}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('User, pickup, destination, and vehicle type are required to create a ride');
    }
    const fare = await getFare(pickup, destination);
    const distanceTime = await mapService.getDistanceTime(pickup, destination);
    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6), // Generate a 6-digit OTP
        fare: fare[vehicleType],
        distance: distanceTime.distance, // in kilometers
        duration: distanceTime.duration  // in seconds
    });
    return ride;
}


module.exports.confirmRide = async ({rideId, captain}) => {
    if(!rideId){
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    },{
        status: 'accepted',
        captain: captain._id
    })
    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp')
    if(!ride){
        throw new Error('Ride not found');
    }
   return ride;
}

module.exports.startRide = async ({rideId, otp, captain}) =>{
   if(!rideId || !otp){
        throw new Error('Ride id and OTP are required');
    }
    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

     if(!ride){
        throw new Error('Ride not found');
    }
    
    if(ride.status !== 'accepted'){
     throw new Error('Ride not accepted');
    }
    
    if(ride.otp !== otp){
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    },{
        status: 'ongoing'
    })

    sendMessageToSocketId(ride.user.socketId,{
        event: 'ride-started',
        data: ride
    })

    return ride;
}


module.exports.endRide = async ({rideId, captain}) => {
    if(!rideId){
        throw new Error('Ride id is required');
    }
    
    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if(!ride){
        throw new Error('Ride not found');
    }

    if(ride.status !== 'ongoing'){
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    },{
        status: 'completed'
    })

    sendMessageToSocketId(ride.user.socketId,{
        event: 'ride-completed',
        data: ride
    })

    return ride;
}