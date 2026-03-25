const createError = require("../utils/createError.js");
const validatePostcode = require("../utils/validatePostcode.js");

exports.getRestaurants = async (req, res, next) => {
    const { postcode } = req.query; 

    if (postcode === undefined || (!validatePostcode(postcode))) {
        throw createError("Bad request", 400);
    };

    const response = await fetch(`https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`)
    
    if (!response.ok) {
        const status = response.status;
        
        throw createError(`HTTP error! Status: ${status}`, status)
    };

    const data = await response.json();

    const filteredRestaurants = data.restaurants.slice(0, 10);
    
    res.status(200).send({restaurants: filteredRestaurants});
};