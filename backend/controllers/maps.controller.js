const mapService = require('../services/maps.service');
const {validationResult} = require('express-validator');


module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { address } = req.query;
    
    if (!address) {
        return res.status(400).json({ message: 'Address is required' });
    }
    
    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({message: 'Coordinates not found'})
    }
}

// This controller handles the request to get the distance and time between two locations.
module.exports.getDistanceTime = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { origin, destination } = req.query;
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);

    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    }

}


// This controller handles the request to get place suggestions based on user input.
module.exports.getSuggestions = async (req, res, next) => {
try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { input } = req.query;
    
    const suggestions = await mapService.getSuggestions(input);
    res.status(200).json(suggestions);

}catch(err){
    console.error(err);
    res.status(500).json({message: 'Internal server error'});
}
    
}