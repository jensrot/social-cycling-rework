const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateResetInput(data) {
    let errors = {};
    console.log(typeof data.password);
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password is required";
    } else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters long";
    }

    if (Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "You have to confirm your password";
    } else if (!Validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};