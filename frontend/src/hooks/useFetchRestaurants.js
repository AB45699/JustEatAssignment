import { useEffect, useState } from 'react'; 
import { getRestaurants } from '../services/restaurants.js';

function useFetchRestaurants(postcode) {
	const [restaurants, setRestaurants] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null); 

	const fetchRestaurants = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const fetchedRestaurants = await getRestaurants(postcode); 
			setRestaurants(fetchedRestaurants);
		} catch (err) {
			setError("An error occurred. Please try again!"); 
		} finally {
			setIsLoading(false);
		}
	}; 

	useEffect(()=>{
		fetchRestaurants();
	}, [postcode]);

	return {restaurants, isLoading, error};
}; 

export default useFetchRestaurants;
