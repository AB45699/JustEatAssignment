import { getRestaurants } from "./restaurants.js";

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

beforeEach(()=>{
	global.fetch = vi.fn();
}); 

afterEach(()=>{
	vi.clearAllMocks();
}); 

describe("getRestaurants", ()=>{
	it("fetches restaurant data successfully", async ()=>{
		global.fetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({restaurants: mockData})
		});

		const output = await getRestaurants("EC4M7RF");
		expect(output).toEqual(mockData);
		expect(global.fetch).toHaveBeenCalledWith("http://localhost:9090/api/restaurants?postcode=EC4M7RF");
	}); 
	it("throws an error if fetch fails due to an HTTP error", async ()=>{
		global.fetch.mockResolvedValueOnce({
			ok: false, 
			status: 401
		}); 

		await expect(getRestaurants("EC4M7RF")).rejects.toThrow("HTTP error, 401"); 
	}); 
	it("throws an error if fetch fails due to fetch failure", async ()=>{
		global.fetch.mockRejectedValueOnce(
			new Error ("Network error")
		); 

		await expect(getRestaurants("EC4M7RF")).rejects.toThrow("Network error");
	});
});