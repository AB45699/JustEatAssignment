import { useParams } from 'react-router'; 
import { useEffect, useState } from 'react'; 
import { getRestaurants } from '../../services/restaurants.js';

function RestaurantsGrid() {
	const { postcode } = useParams(); 
	const [restaurants, setRestaurants] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null); 

	const fetchRestaurants = async () => {
		try {
			const fetchedRestaurants = await getRestaurants(postcode); 
			setRestaurants(fetchedRestaurants);
		} catch (err) {
			setError(err); //user friendly message
		} finally {
			setIsLoading(false);
		}
	}; 

	useEffect(()=>{
		fetchRestaurants();
	}, [postcode]);
	
	if (isLoading) {
		return <p>...loading</p>
	}; 

	if (error) {
		return <p>error</p>
	}; 

	return (
		<>
		{restaurants.map((restaurant)=>{
			return <p>{restaurant.name}</p>
		})}
		</>
	)
}; 

export default RestaurantsGrid;