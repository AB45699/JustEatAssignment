const transformData = require("./transformData.js"); 

let singleRestaurant, multipleRestaurants;

beforeEach(()=>{
    singleRestaurant = [
        {
            "name": "Pizza Restaurant",
            "address": {"city": "London","firstLine": "1 London Street"},
            "rating": {"starRating": 3.25},
			"logoUrl": "https://test/uk/images/restaurants/60392.gif",
            "cuisines": [{"name": "Pizza"},{"name": "Italian"}]
        }]; 

    multipleRestaurants =  [
        {
            "name": "Burrito Restaurant",
            "address": {"city": "London","firstLine": "2 London Street"},
            "rating": {"starRating": 5},
			"logoUrl": "https://test/uk/images/restaurants/60392.gif",
            "cuisines": [{"name": "Fast food"},{"name": "Mexican"}]
        },
        {
            "name": "Chicken Restaurant",
            "address": {"city": "London","firstLine": "3 London Street"},
            "rating": {"starRating": 3.5},
			"logoUrl": "https://test/uk/images/restaurants/60392.gif",
            "cuisines": [{"name": "Chicken"}]
        }];
});

describe("transformData", ()=>{
    describe("Main functionality", ()=>{
        test("returns an array", ()=>{
            expect(Array.isArray(transformData([]))).toBe(true);
        });
        test("transforms a single raw restaurant object into the desired shape", ()=>{
            const output = transformData(singleRestaurant);

            expect(output[0]).toMatchObject({ 
                "name": "Pizza Restaurant", 
                "address": {"city": "London","firstLine": "1 London Street"},
                "starRating": 3.25, 
				"logoUrl": "https://test/uk/images/restaurants/60392.gif",
                "cuisines": ["Pizza", "Italian"]
            }); 
        }); 
        test("transforms multiple raw restaurant objects into the desired shape", ()=>{
            const output = transformData(multipleRestaurants);

            expect(output[0]).toMatchObject({
                    "name": "Burrito Restaurant",
                    "address": {"city": "London","firstLine": "2 London Street"},
                    "starRating": 5,
					"logoUrl": "https://test/uk/images/restaurants/60392.gif",
                    "cuisines": ["Fast food", "Mexican"]
            });
            expect(output[1]).toMatchObject({
                    "name": "Chicken Restaurant",
                    "address": {"city": "London","firstLine": "3 London Street"},
                    "starRating": 3.5,
					"logoUrl": "https://test/uk/images/restaurants/60392.gif",
                    "cuisines": ["Chicken"]
                
            }); 
        });
    });
    describe("Edge cases", ()=>{
        test("an empty array input returns an empty array", ()=>{
            expect(transformData([])).toEqual([]);
        }); 
        test("no input returns an empty array", ()=>{
            expect(transformData()).toEqual([]);
        }); 
        describe("Missing keys handling", ()=>{
            test("Should return cuisines key as an empty array if the key is missing", ()=>{
                const {cuisines, ...rest} = singleRestaurant[0];
                const noCuisinesData = [rest];
                
                expect(transformData(noCuisinesData)[0]).toHaveProperty("cuisines", []); 
            }); 
            test("Should return name key as 'Restaurant' if the name key is missing", ()=>{
                const {name, ...rest} = singleRestaurant[0];
                const noNameData = [rest];

                expect(transformData(noNameData)[0]).toHaveProperty("name", "Restaurant");  
            });
            test("Should return 'Unavailable' for city and firstLine keys if address key is missing", ()=>{
                const {address, ...rest} = singleRestaurant[0];
                const noAddressData = [rest];
                const output = transformData(noAddressData);

                expect(output[0]).toHaveProperty("address.city", "Unavailable");
                expect(output[0]).toHaveProperty("address.firstLine", "Unavailable");
            });
            test("Should return starRating key as 0 if the starRating key is missing", ()=>{
                const noStarRatingData = [{...singleRestaurant[0], "rating": {}}]; 

                expect(transformData(noStarRatingData)[0]).toHaveProperty("starRating", 0);
            });
            test("Should return starRating key as 0 if the rating key is missing", ()=>{
                const {rating, ...rest} = singleRestaurant[0];
                const noRatingData = [rest]; 

                expect(transformData(noRatingData)[0]).toHaveProperty("starRating", 0);
            });
			test("Should return an empty string if logoUrl key is missing", ()=>{
				const {logoUrl, ...rest} = singleRestaurant[0];
                const noLogoUrlData = [rest]; 

                expect(transformData(noLogoUrlData)[0]).toHaveProperty("logoUrl", "");
			});
        });
        describe("Null handling", ()=>{
            test("Should return cuisines key as an empty array if cuisines is null", ()=>{
                const nullCuisinesData = [{...singleRestaurant[0], "cuisines": null}];

                expect(transformData(nullCuisinesData)[0]).toHaveProperty("cuisines", []);
            });
            test("Should return name key as 'Restaurant' if name is null", ()=>{
                const nullNameData = [{...singleRestaurant[0], "name": null}];

                expect(transformData(nullNameData)[0]).toHaveProperty("name", "Restaurant");
            });
            test("Should return 'Unavailable' for city and firstLine keys if address is null", ()=>{
                const nullAddressData = [{...singleRestaurant[0], "address": null}];
                const output = transformData(nullAddressData);

                expect(output[0]).toHaveProperty("address.city", "Unavailable");
                expect(output[0]).toHaveProperty("address.firstLine", "Unavailable");
            });
            test("Should return starRating key as 0 if starRating is null", ()=>{
                const nullStarRatingData = [{...singleRestaurant[0], "rating": {"starRating": null}}];

                expect(transformData(nullStarRatingData)[0]).toHaveProperty("starRating", 0);
            });
            test("Should return starRating key as 0 if rating is null", ()=>{
                const nullRatingData = [{...singleRestaurant[0], "rating": null}];

                expect(transformData(nullRatingData)[0]).toHaveProperty("starRating", 0);
            });
			test("Should return an empty string if logoUrl key is null", ()=>{
                const nullLogoUrlData = [{...singleRestaurant[0], "logoUrl": null}]; 

                expect(transformData(nullLogoUrlData)[0]).toHaveProperty("logoUrl", "");
			});
        });
        describe("Empty value handling", ()=>{
            test("Should return cuisines key as an empty array if cuisines is empty", ()=>{
                const emptyCuisinesData = [{...singleRestaurant[0], "cuisines": []}];

                expect(transformData(emptyCuisinesData)[0]).toHaveProperty("cuisines", []);
            });
            test("Should return name key as 'Restaurant' if name is empty string", ()=>{
                const emptyNameData = [{...singleRestaurant[0], "name": ""}];

                expect(transformData(emptyNameData)[0]).toHaveProperty("name", "Restaurant");
            });
            test("Should return 'Unavailable' for city and firstLine keys if address is empty", ()=>{
                const emptyAddressData = [{...singleRestaurant[0], "address": {}}];
                const output = transformData(emptyAddressData);

                expect(output[0]).toHaveProperty("address.city", "Unavailable");
                expect(output[0]).toHaveProperty("address.firstLine", "Unavailable");
            });
			test("Should return an empty string if logoUrl key is empty string", ()=>{
                const emptyLogoUrlData = [{...singleRestaurant[0], "logoUrl": ""}]; 

                expect(transformData(emptyLogoUrlData)[0]).toHaveProperty("logoUrl", "");
			});
        });
    }); 
    describe("Mutability tests", ()=>{
        test("does not mutate the input array", ()=>{
            const input = multipleRestaurants;

            transformData(input);
            expect(input).toEqual([
                {
                    "name": "Burrito Restaurant",
                    "address": {"city": "London","firstLine": "2 London Street"},
                    "rating": {"starRating": 5},
					"logoUrl": "https://test/uk/images/restaurants/60392.gif",
                    "cuisines": [{"name": "Fast food"},{"name": "Mexican"}]
                },
                {
                    "name": "Chicken Restaurant",
                    "address": {"city": "London","firstLine": "3 London Street"},
                    "rating": {"starRating": 3.5},
					"logoUrl": "https://test/uk/images/restaurants/60392.gif",
                    "cuisines": [{"name": "Chicken"}]
                }
            ]);
        });
        test("returns a new array", ()=>{
            const input = multipleRestaurants;
            const output = transformData(input);
            
            expect(input).not.toBe(output);
        });
        test("the objects within the returned array are new", ()=>{
            const input = multipleRestaurants;
            const output = transformData(input);

            output.forEach((restaurant, i)=> {
                expect(restaurant).not.toBe(input[i]);
            });
        });
    });
});