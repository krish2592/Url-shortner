
let isValid = async function (value) {
    if (typeof value === "undefined" || value == null || 
    (typeof value === "string" && value.trim().length === 0)) return false;
    return true;
}


module.exports={isValid}