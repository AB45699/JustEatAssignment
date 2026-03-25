const createError = require("./createError.js");

describe("createError", ()=>{
    test("should return an error", ()=>{
        expect(createError("", 400)).toBeInstanceOf(Error);
    }); 
    test("the error has a message property matching the passed in string", ()=>{
        expect(createError("test message", 400)).toHaveProperty("message", "test message");
    }); 
    test("the error has a status property matching the passed in number", ()=>{
       expect((createError("", 400))).toHaveProperty("status", 400);
    }); 
    test("the message property is an empty string if no message argument is provided", ()=>{
        expect(createError(undefined, 400)).toHaveProperty("message", "");
    });
    test("the status property is not present on the returned error object if no status code is provided", ()=>{
        expect(createError("", undefined)).not.toHaveProperty("status");
    });
    test("if both arguments are not provided, there is no status property and the message property is an empty string", ()=>{
        const testError = createError();

        expect(testError).not.toHaveProperty("status");
        expect(testError).toHaveProperty("message", "");
    });
    test("the message property is an empty string if the passed in message argument is not of type string", ()=>{
        expect((createError(123, 400))).toHaveProperty("message", "");
    }); 
    test("there is no status property on the returned error object if the passed in status argument is not of type number", ()=>{
        expect(createError("", "test")).not.toHaveProperty("status");
    });
})