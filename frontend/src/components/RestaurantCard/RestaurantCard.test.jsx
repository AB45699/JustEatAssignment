import RestaurantCard from "./RestaurantCard.jsx";
import { render, screen } from '@testing-library/react';

const mockRestaurantData = {
	name: "Test restaurant", 
	address: {city: "London", firstLine: "1 Test Street"}, 
	starRating: 4, 
	logoUrl: 'www.test-image.org/logo.png', 
	cuisines: ["Chicken", "Mexican"]
}; 

describe("RestaurantCard", ()=>{
	it("renders the passed in restaurant object properties", ()=>{
		render(<RestaurantCard restaurant={mockRestaurantData}/>)

		expect(screen.getByText("Test restaurant")).toBeInTheDocument();
		expect(screen.getByText("London, 1 Test Street")).toBeInTheDocument();
		expect(screen.getByText("Chicken, Mexican")).toBeInTheDocument();
		expect(screen.getByText("★ 4")).toBeInTheDocument();
		
		const image = screen.getByAltText("logo image");
		expect(image).toBeInTheDocument();
		expect(image.src).toContain("http://localhost:3000/www.test-image.org/logo.png");
	}); 
	it("renders the fallback FoodStockImage if logoUrl is an empty string", ()=>{
		//backend sends an empty string if logoUrl is missing/null/empty
		render(<RestaurantCard restaurant={{...mockRestaurantData, logoUrl: ""}}/>); 

		const image = screen.getByAltText("logo image");
		expect(image).toBeInTheDocument();
		expect(image.src).toContain("http://localhost:3000/src/assets/images/food-stock-image.jpg");
	}); 
	it("renders a maximum of 3 cuisines items", ()=>{
		render(<RestaurantCard restaurant={{...mockRestaurantData, 
			cuisines: ["Chicken", "Mexican", "Italian", "Kebab"]}}/>); 

		expect(screen.getByText("Chicken, Mexican, Italian")).toBeInTheDocument();
		expect(screen.queryByText("Kebab")).not.toBeInTheDocument();
	}); 
}); 