import { useParams } from 'react-router'; 
import useFetchRestaurants from '../../hooks/useFetchRestaurants.js';

function RestaurantsGrid() {
	const { postcode } = useParams(); 
	const { restaurants, isLoading, error } = useFetchRestaurants(postcode);
	
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