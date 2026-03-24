const app = require("../app.js"); 
const request = require("supertest");
const mockData = require("./mockRestaurantData.js");

beforeEach(()=>{
    global.fetch = jest.fn();
}); 

afterEach(()=>{
    jest.clearAllMocks();
});

describe("app", ()=>{
    describe("GET /api/restaurants", ()=>{
        test("should respond with a status of 200", async ()=>{
            global.fetch.mockResolvedValueOnce({
                ok: true, 
                json: async () => mockData
            }); 

            await request(app).get("/api/restaurants").expect(200);
        });
        test("responds with an array on the key of restaurants", async ()=> {
            global.fetch.mockResolvedValueOnce({
                ok: true, 
                json: async () => mockData
            }); 

            const { body } = await request(app).get("/api/restaurants"); 

            expect(Array.isArray(body.restaurants)).toBe(true);
        });
        test("responds with an array of length 10", async()=>{
            global.fetch.mockResolvedValueOnce({
                ok: true, 
                json: async () => mockData
            }); 

            const { body } = await request(app).get("/api/restaurants"); 
            
            expect(body.restaurants.length).toBe(10);
        });
        test("the restaurants (objects) within the array have the required id, name, address, rating and cuisine keys", async ()=>{
            global.fetch.mockResolvedValueOnce({
                ok: true, 
                json: async () => mockData
            });

            const { body } = await request(app).get("/api/restaurants");

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
        })
    })
})