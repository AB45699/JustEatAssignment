import { useParams } from 'react-router'; 
import useFetchRestaurants from '../../hooks/useFetchRestaurants.js';
import RestaurantCard from '../RestaurantCard/RestaurantCard.jsx';
import './RestaurantsGrid.css';
import Loading from '../Loading/Loading.jsx';

function RestaurantsGrid() {
	const { postcode } = useParams(); 
	const { restaurants, isLoading, error } = useFetchRestaurants(postcode);
	
	if (isLoading) {
		return <Loading />
	}; 

	if (error) {
		return <h1 className="restaurants__error">{error}</h1>
	}; 

	return (
		<>
			{restaurants.length === 0 ? (
				<div className="restaurants__no-results">
					<h1 className="restaurants__no-results-title">No results for {postcode}!</h1>
					<h2 className="restaurants__no-results-subtitle">Try searching for another postcode.</h2>
				</div>
			) : (
				<div className="restaurants__container">
				<h1 className="restaurants__title">{restaurants.length} restaurants within "{postcode}"</h1>
				<div className="restaurants__grid">
					{restaurants.map((restaurant, index)=>{
						return <RestaurantCard key={index} restaurant={restaurant}/>
					})}
				</div>
			</div>
			)}
		</>
	)
}; 

export default RestaurantsGrid;