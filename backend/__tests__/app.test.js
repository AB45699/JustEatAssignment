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
        })
    })
})