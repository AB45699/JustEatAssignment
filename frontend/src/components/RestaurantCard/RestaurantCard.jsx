import './RestaurantCard.css';

function RestaurantCard({restaurant}) {
	return (
		<div className="restaurant-grid__item">
			{restaurant.name}
			{restaurant.address.city}
			{restaurant.address.firstLine}
			{restaurant.starRating}
			{restaurant.cuisines.map((cuisine)=>{
				return (<p>{cuisine}</p>)
			})}
			</div>
	)
}; 

export default RestaurantCard;