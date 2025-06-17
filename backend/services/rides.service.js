const rideModel = require('../models/rides.model');
const mapService = require('../services/maps.service');


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
    auto: baseFare.auto + (distanceTime.distance * perKmRate.auto) + (distanceTime.duration / 60) * 2, // Adding a time component
    car: baseFare.car + (distanceTime.distance * perKmRate.car) + (distanceTime.duration / 60) * 3, // Adding a time component
    motorcycle: baseFare.motorcycle + (distanceTime.distance * perKmRate.motorcycle) + (distanceTime.duration / 60) * 1 // Adding a time component
};
return fare;
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
        fare: fare[vehicleType],
        distance: distanceTime.distance, // in kilometers
        duration: distanceTime.duration  // in seconds
    });
    return ride;
}


