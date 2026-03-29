import RestaurantsGrid from "./RestaurantsGrid.jsx";
import { render, screen } from '@testing-library/react'; 
import useFetchRestaurants from "../../hooks/useFetchRestaurants.js";
import { MemoryRouter, useParams } from 'react-router';

const mockRestaurantData = {
	name: "Test restaurant", 
	address: {city: "London", firstLine: "1 Test Street"}, 
	starRating: 4, 
	logoUrl: 'www.test-image.org/logo.png', 
	cuisines: ["Chicken", "Mexican"]
};

vi.mock('../../hooks/useFetchRestaurants.js', ()=>({
	default: vi.fn()
})); 

vi.mock('react-router', async () => {
	const actual = await vi.importActual('react-router');
	return {
		...actual,
		useParams: vi.fn()
	};
});

let renderComponent;

beforeEach(()=>{
	renderComponent = () =>{
		render (
			<MemoryRouter>
				<RestaurantsGrid />
			</MemoryRouter>
		)
	};

	useParams.mockReturnValue({postcode: "EC4M7RF"});
});

afterEach(()=>{
	vi.clearAllMocks();
}); 

describe("RestaurantsGrid", ()=>{
	it("renders Loading component if useFetchRestaurants returns loading state", ()=>{
		useFetchRestaurants.mockReturnValue({restaurants: [], isLoading: true, error: null}); 
		renderComponent(); 

		expect(screen.getByTestId("loader")).toBeInTheDocument();
	});
	it("renders the error text if useFetchRestaurants returns an error", ()=>{
		useFetchRestaurants.mockReturnValue({restaurants: [], isLoading: false, error: "An error occurred. Please try again!"}); 
		renderComponent();  

		expect(screen.getByRole("heading", {name: /error occurred/})).toBeInTheDocument();
	});
	it("renders the no results text if restaurants is an empty array", ()=>{
		useFetchRestaurants.mockReturnValue({restaurants: [], isLoading: false, error: null}); 
		renderComponent();  

		expect(screen.getByRole("heading", {name: "No results for EC4M7RF!"})).toBeInTheDocument(); 
		expect(screen.getByRole("heading", {name: /Try searching/})).toBeInTheDocument();
		expect(screen.queryByRole("heading", {name: /restaurants within/})).not.toBeInTheDocument();
	});
	it("renders the results text and restaurants card if restaurants is not an empty array", ()=>{
		useFetchRestaurants.mockReturnValue({restaurants: [mockRestaurantData], isLoading: false, error: null}); 
		renderComponent();  

		expect(screen.getByRole("heading", {name: '1 restaurants within "EC4M7RF"'})).toBeInTheDocument();
		expect(screen.queryByRole("heading", {name: /No results/})).not.toBeInTheDocument(); 
		expect(screen.getByText("Test restaurant")).toBeInTheDocument();
	}); 
});