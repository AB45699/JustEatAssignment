export const getRestaurants = async (postcode) => {
	const response = await fetch(`http://localhost:9090/api/restaurants?postcode=${postcode}`); 

	if (!response.ok) {
		throw new Error(`HTTP error, ${response.status}`); 
	}; 

	const {restaurants} = await response.json();
	
	return restaurants;
};