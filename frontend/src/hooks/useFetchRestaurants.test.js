import useFetchRestaurants from "./useFetchRestaurants.js"; 
import { getRestaurants } from "../services/restaurants.js";
import { renderHook, waitFor } from '@testing-library/react';

const mockData = [
			{
				"name": "Zam Zam Grill",
				"address": {"city": "London","firstLine": "51 Hackney Road"},
				"starRating": 5,
				"cuisines": [ "Kebab","Chicken","Halal","Collect stamps","Deals"]
			},
			{
				"name": "Morley's® - Brick Lane",
				"address": { "city": "London","firstLine": "60 Brick Lane"},
				"starRating": 4,
				"cuisines": ["Chicken","Burgers","Collect stamps","Deals"]
			}
		];

vi.mock('../services/restaurants.js', ()=>({
	getRestaurants: vi.fn()
}));
	
afterEach(()=>{
	vi.clearAllMocks();
}); 

describe("useFetchRestaurants", ()=>{
	it("returns data when fetch succeeds", async ()=>{
		getRestaurants.mockResolvedValueOnce(mockData);

		const { result } = renderHook(() => useFetchRestaurants("EC4M7RF")); 

		await waitFor(() => expect(result.current.isLoading).toBe(false));
		expect(result.current.restaurants).toEqual(mockData); 
		expect(result.current.error).toBe(null);
	}); 
	it("sets error state when getRestaurants throws an error", async ()=>{
		getRestaurants.mockRejectedValueOnce(
			new Error("API error")
		); 

		const { result } = renderHook(() => useFetchRestaurants("EC4M7RF"));

		await waitFor(() => expect(result.current.isLoading).toBe(false));
		expect(result.current.restaurants).toEqual([]);
		expect(result.current.error).toBe("An error occurred. Please try again!")
	});
});