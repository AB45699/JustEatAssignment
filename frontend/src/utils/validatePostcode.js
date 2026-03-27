function validatePostcode(postcode = "") {
    if (typeof(postcode) !== "string") {
        return false
    }; 

    const modifiedPostcode = postcode.replaceAll(" ", "").toUpperCase();
    const regex = /[^A-Z0-9]/

    if (modifiedPostcode.length > 7 || 
        modifiedPostcode.length < 5 || 
        regex.test(modifiedPostcode)) {

        return false;
    }; 

    return true
}; 

export default validatePostcode;