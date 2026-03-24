const app = require("../app.js"); 
const request = require("supertest");

describe("app", ()=>{
    describe("GET /api/restaurants", ()=>{
        test("should respond with a status of 200", async ()=>{
            await request(app).get("/api/restaurants").expect(200);
        });
        test("responds with an array on the key of restaurants", async ()=> {
            const { body } = await request(app).get("/api/restaurants"); 

            expect(Array.isArray(body.restaurants)).toBe(true);
        })
    })
})