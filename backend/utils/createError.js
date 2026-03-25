function createError(message, status) {
    if (typeof(message) !== "string") {
        message = ""; 
    }; 

    const error = new Error(message);
    
    if (status && typeof(status) === "number") {
        error.status = status;
    };

    return error
};

module.exports = createError;