function transformData(restaurants = []) {
    return restaurants.map((restaurant)=>{
        let {name, address, rating, cuisines, logoUrl} = restaurant;

        cuisines = (cuisines ?? []).map((cuisine)=>cuisine.name); 
        address = {
            city: address?.city ?? "Unavailable",
            firstLine: address?.firstLine ?? "Unavailable"
        };

        return {
            "name": name || "Restaurant", 
            "address": address, 
            "starRating": rating?.starRating ?? 0, 
			"logoUrl": logoUrl ?? "",
            "cuisines": cuisines
        };
    });
}; 

module.exports = transformData;