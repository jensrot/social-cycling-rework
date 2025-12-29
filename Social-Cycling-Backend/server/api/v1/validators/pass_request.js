const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRequestInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};