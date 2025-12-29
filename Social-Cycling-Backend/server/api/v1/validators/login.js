const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLogindata(data) {
  let errors = {};

  data.loginEmail = !isEmpty(data.loginEmail) ? data.loginEmail : "";
  data.loginPassword = !isEmpty(data.loginPassword) ? data.loginPassword : "";

  if (Validator.isEmpty(data.loginEmail)) {
    errors.loginEmail = "Email field is required";
  } else if (!Validator.isEmail(data.loginEmail)) {
    errors.loginEmail = "Email is invalid";
  }

  if (Validator.isEmpty(data.loginPassword)) {
    errors.loginPassword = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};