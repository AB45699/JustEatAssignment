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
		getRestaurants.mockRejectedValueOnce(new Error("API error")); 

		const { result } = renderHook(() => useFetchRestaurants("EC4M7RF"));

		await waitFor(() => expect(result.current.isLoading).toBe(false));
		expect(result.current.restaurants).toEqual([]);
		expect(result.current.error).toBe("An error occurred. Please try again!")
	});
	it("clears the error from a previous errored fetch, when refetching successfully", async ()=>{
		getRestaurants.mockRejectedValueOnce(new Error("API error")); //reject the fetch in the first call.

		const { result, rerender } = renderHook(useFetchRestaurants, {initialProps: "EC4M7RF"}); //render the hook and use iniitalProps as the postcode argument.
		
		expect(getRestaurants).toHaveBeenCalledWith("EC4M7RF"); //confirm props has passed through.
		await waitFor(()=>expect(result.current.isLoading).toBe(false));
		expect(result.current.error).toBe("An error occurred. Please try again!"); 

		getRestaurants.mockResolvedValueOnce(mockData); //resolve the second fetch call.
		rerender("SW1A1AA"); //rerender the hook, use a new postcode to re-trigger the function.

		expect(getRestaurants).toHaveBeenCalledWith("SW1A1AA"); //confirm a new call with changed postcode.
		await waitFor(()=>expect(result.current.isLoading).toBe(false));
		expect(result.current.error).toBe(null); //confirm cleared error state.
	});
	it("resets loading state to true before a new fetch", async ()=>{
		getRestaurants.mockResolvedValueOnce(mockData);

		const { result, rerender } = renderHook(useFetchRestaurants, {initialProps: "EC4M7RF"});

		await waitFor(()=>expect(result.current.isLoading).toBe(false));
		rerender("SW1A1AA"); 
		expect(result.current.isLoading).toBe(true);
	}); 
});