exports.getRestaurants = async (req, res, next) => {
    const response = await fetch(`https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/EC4M7RF`)
    
    const data = await response.json();

    const filteredRestaurants = data.restaurants.slice(0, 10);
    
    res.status(200).send({restaurants: filteredRestaurants});
}