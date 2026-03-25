const validatePostcode = require("./validatePostcode.js"); 

describe("validatePostcode", ()=>{
    test("should return a boolean value", ()=>{
        expect(typeof(validatePostcode(""))).toBe("boolean");
    }); 
    test("returns true for a valid UK postcode", ()=>{
        expect(validatePostcode("EC4M 7RF")).toBe(true);
    });
    test("returns true for all lower and mixed case valid postcode inputs", ()=>{
        expect(validatePostcode("ec4m 7rf")).toBe(true);
        expect(validatePostcode("ec4M 7Rf")).toBe(true);
    }); 
    test("ignores any spaces within the input", ()=>{
        expect(validatePostcode(" EC4M 7RF  ")).toBe(true);
    });
    test("returns false if postcode length is less than 5", ()=>{
        expect(validatePostcode("L3 AA")).toBe(false);
        expect(validatePostcode("L3AA")).toBe(false);
    }); 
    test("returns false if postcode length is more than 7", ()=>{
        expect(validatePostcode("EC4M 7RFF")).toBe(false);
        expect(validatePostcode("EC4M7RFF")).toBe(false);
    });
    test("returns true for postcodes at length boundary (5 and 7)", ()=>{
        expect(validatePostcode("L3 AAA")).toBe(true);
        expect(validatePostcode("L3B AAAA")).toBe(true);
    });
    test("returns false if any non-alphanumeric characters are present", ()=>{
        expect(validatePostcode("EC$M 7RF")).toBe(false);
        expect(validatePostcode("SW1A-1AA")).toBe(false);
        expect(validatePostcode("CT1 2ÉH")).toBe(false);
    });
    test("returns false if an empty string is provided", ()=>{
        expect(validatePostcode("")).toBe(false);
    }); 
    test("returns false if no argument is provided", ()=>{
        expect(validatePostcode()).toBe(false);
    }); 
    test("returns false if the passed in postcode is not of type string", ()=>{
        expect(validatePostcode(123)).toBe(false);
        expect(validatePostcode([])).toBe(false);
        expect(validatePostcode(null)).toBe(false);
    }); 
})