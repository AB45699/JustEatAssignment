import { useParams } from 'react-router'; 
import useFetchRestaurants from '../../hooks/useFetchRestaurants.js';
import RestaurantCard from '../RestaurantCard/RestaurantCard.jsx';
import './RestaurantsGrid.css';

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
		<div className="restaurants__container">
			<h1 className="restaurants__title">{restaurants.length} restaurants within "{postcode}"</h1>
			<div className="restaurants__grid">
				{restaurants.map((restaurant, index)=>{
					return <RestaurantCard key={index} restaurant={restaurant}/>
				})}
			</div>
		</div>
	)
}; 

export default RestaurantsGrid;