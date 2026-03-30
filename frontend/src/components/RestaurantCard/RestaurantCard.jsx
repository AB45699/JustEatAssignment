import './RestaurantCard.css';
import FoodStockImage from '../../assets/images/food-stock-image.jpg';

function RestaurantCard({restaurant}) {
	let { name, address, starRating, logoUrl, cuisines } = restaurant;
	
	logoUrl = logoUrl || FoodStockImage; 
	cuisines = cuisines.slice(0, 3).join(', ');

	return (
		<div className="restaurant-item">
			<div className="restaurant-item__container">

				<img className="restaurant-item__logo" src={logoUrl} alt="logo image"/> 

				<div className="restaurant-item__details-container">
					<p className="restaurant-item__name">
						{name}
					</p>

					<div className="restaurant-item__address-container">
						<p className="restaurant-item__address">
							{address.city}, {address.firstLine}
						</p>
					</div>

					<p className="restaurant-item__rating">
						{starRating !== null ? `★ ${starRating}` : "No ratings yet"}
					</p>

					<div className="restaurant-item__cuisines-container">
						<p className="restaurant-item__cuisines">
							{cuisines}
						</p>
					</div>
				</div>

			</div>
		</div>
	)
}; 

export default RestaurantCard;