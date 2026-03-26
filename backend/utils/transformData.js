function transformData(restaurants = []) {
    return restaurants.map((restaurant)=>{
        let {name, address, rating, cuisines} = restaurant;

        cuisines = (cuisines ?? []).map((cuisine)=>cuisine.name); 
        address = address ?? { city: "Unavailable", firstLine: "Unavailable" };

        return {
            "name": name ?? "Restaurant", 
            "address": address, 
            "starRating": rating?.starRating ?? 0, 
            "cuisines": cuisines
        };
    });
}; 

module.exports = transformData;