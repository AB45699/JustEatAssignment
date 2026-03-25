exports.getRestaurants = async (req, res, next) => {
    const { postcode } = req.query; 

    if (postcode === undefined) {
        const error = new Error ("Bad request");
        error.status = 400;
        throw error;
    };

    const response = await fetch(`https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`)
    
    if (!response.ok) {
        const error = new Error (`HTTP error! Status: ${response.status}`);
        error.status = response.status;
        throw error;
    };

    const data = await response.json();

    const filteredRestaurants = data.restaurants.slice(0, 10);
    
    res.status(200).send({restaurants: filteredRestaurants});
}