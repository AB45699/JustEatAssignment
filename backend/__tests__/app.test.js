const app = require("../app.js"); 
const request = require("supertest");
const mockData = require("./mockRestaurantData.js");

const mockSuccessfulFetch = () => {
    global.fetch.mockResolvedValueOnce({
        ok: true, 
        json: async () => mockData
    }); 
};

beforeEach(()=>{
    global.fetch = jest.fn();
}); 

afterEach(()=>{
    jest.clearAllMocks();
});

describe("app", ()=>{
    test("should respond with status of 404 and error message for invalid path", async () => {
        const { body } = await request(app).get("/invalid/path").expect(404);

        expect(body.message).toBe("Path not found");
    });
    describe("GET /api/restaurants", ()=>{
        describe("Successful fetch response", ()=>{
            test("should respond with a status of 200", async ()=>{
                mockSuccessfulFetch();

                await request(app).get("/api/restaurants?postcode=EC4M7RF").expect(200);
            });
            test("responds with an array on the key of restaurants", async ()=> {
                mockSuccessfulFetch();

                const { body } = await request(app).get("/api/restaurants?postcode=EC4M7RF"); 

                expect(Array.isArray(body.restaurants)).toBe(true);
            });
            test("responds with an array of length 10", async()=>{
                mockSuccessfulFetch();

                const { body } = await request(app).get("/api/restaurants?postcode=EC4M7RF"); 
                
                expect(body.restaurants.length).toBe(10);
            });
            test("the restaurants (objects) within the array have the required id, name, address, rating and cuisine keys", async ()=>{
                mockSuccessfulFetch();

                const { body } = await request(app).get("/api/restaurants?postcode=EC4M7RF");

                body.restaurants.forEach((restaurant)=>{
                    expect(restaurant).toHaveProperty("id");
                    expect(typeof(restaurant.id)).toBe("string");

                    expect(restaurant).toHaveProperty("name");
                    expect(typeof(restaurant.name)).toBe("string");

                    expect(restaurant).toHaveProperty("address.city");
                    expect(typeof(restaurant.address.city)).toBe("string");
                    expect(restaurant).toHaveProperty("address.firstLine");
                    expect(typeof(restaurant.address.firstLine)).toBe("string");
                    
                    expect(restaurant).toHaveProperty("rating.starRating");
                    expect(typeof(restaurant.rating.starRating)).toBe("number");

                    expect(restaurant).toHaveProperty("cuisines");
                    expect(Array.isArray(restaurant.cuisines)).toBe(true);

                    restaurant.cuisines.forEach((cuisine)=>{
                        expect(typeof(cuisine)).toBe("object");
                        expect(Array.isArray(cuisine)).toBe(false);
                        expect(cuisine).toHaveProperty("name");
                        expect(typeof(cuisine.name)).toBe("string");
                    })
                });
            });
        });
        describe("API scenarios", ()=>{
            test("handles HTTP errors (e.g. 404 error) by responding with the status code and error message", async () => {
                global.fetch.mockResolvedValueOnce({
                    ok: false, 
                    status: 404
                }); 

                const { body } = await request(app).get("/api/restaurants?postcode=EC4M7RF").expect(404);

                expect(body.message).toBe("HTTP error! Status: 404")
            });
            test("handles unsuccessful fetch by responding with a status code of 500 and error message", async () => {
                global.fetch.mockRejectedValueOnce(
                    new Error ("Network error")
                ); 

                const { body } = await request(app).get("/api/restaurants?postcode=EC4M7RF").expect(500);
                
                expect(body.message).toBe("Could not fetch data.")
            });
        });
        describe("Postcode query handling", ()=> {
            test("should respond with a 400 status and error message if postcode query is missing", async () => {
                const { body } = await request(app).get("/api/restaurants").expect(400);

                expect(body.message).toBe("Bad request");
            }); 
            test("should respond with a 400 status and error message if an invalid postcode query is provided", async ()=>{
                const { body } = await request(app).get("/api/restaurants?postcode=EC4m?$F").expect(400); 

                expect(body.message).toBe("Bad request");
            });
        })
    });
})