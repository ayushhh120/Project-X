const axios = require('axios');
const captainModel = require('../models/captain.model')

// This service fetches the coordinates of a given address using the Google Maps Geocoding API.
module.exports.getAddressCoordinate = async (address) => {
  // Replace with your actual Google Maps API key
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/geocode/json`;

  try {
    const response = await axios.get(url, {
      params: {
        address,
        key: apiKey
      }
    });

    if (
      response.data.status === 'OK' &&
      response.data.results &&
      response.data.results.length > 0
    ) {
      const location = response.data.results[0].geometry.location;
      return {

       longitude: location.lng,
        latitude: location.lat
       
      };
    } else {
      throw new Error('No results found for the given address.');
    }
  } catch (error) {
    throw new Error(`Failed to fetch coordinates: ${error.message}`);
  }
};

// This service fetches the distance and time between two locations using the Google Maps Distance Matrix API.
module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error('Origin and destination are required');
  }
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json`;

  try {
    const response = await axios.get(url, {
      params: {
        origins: origin,
        destinations: destination,
        key: apiKey
      }
    });

    if (response.data.status === 'OK') {
      const element = response.data.rows[0].elements[0];
      if (element.status === 'OK') {
        return {
          distance: element.distance.value / 1000, // in kilometers
          duration: element.duration.value // in seconds
        };
      } else if (element.status === 'ZERO_RESULTS') {
        throw new Error('No route found between the specified locations.');
      } else {
        throw new Error(`Unable to fetch distance and time: ${element.status}`);
      }
    } else {
      throw new Error(`Distance Matrix API error: ${response.data.status}`);
    }
  } catch (error) {
    throw new Error(`Failed to fetch distance and time: ${error.message}`);
  }
}

// This service fetches place suggestions based on user input using the Google Maps Places API.
module.exports.getSuggestions = async (input) => {
  if (!input || input.length < 3) {
    throw new Error('Query is required');
  }
  
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;
  try {
    const response = await axios.get(url, {
      params: {
        input,
        key: apiKey
      }
    });
    if(response.data.status === 'OK' ){
      return response.data.predictions;
    } else {
      throw new Error(`Unable to fetch suggestions`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// this function finds captain nearby pickup location
module.exports.getCaptainsInTheRadius = async ( longitude, latitude ,   radius) =>{
  const captain = await captainModel.find({
    location:{
      $geoWithin:{
        $centerSphere: [ [longitude, latitude], radius / 6371 ] //radius in km
        
      }
      
    }
  
  })
  return captain;
}