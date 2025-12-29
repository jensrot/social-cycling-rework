const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterdata(data) {
  let errors = {};

  data.registerName = !isEmpty(data.registerName) ? data.registerName : "";
  data.registerEmail = !isEmpty(data.registerEmail) ? data.registerEmail : "";
  data.registerPassword = !isEmpty(data.registerPassword) ? data.registerPassword : "";
  data.registerRepeatPassword = !isEmpty(data.registerRepeatPassword) ? data.registerRepeatPassword : "";

  if (Validator.isEmpty(data.registerName)) {
    errors.registerName = "Name field is required";
  } else if (!Validator.isLength(data.registerName, { min: 3, max: 30 })) {
    errors.registerName = "Name must be between 3 and 30 characters";
  } else if (Validator.isEmail(data.registerName)) {
    errors.registerName = "Name cannot be an email";
  }

  if (Validator.isEmpty(data.registerEmail)) {
    errors.registerEmail = "Email field is required";
  } else if (!Validator.isEmail(data.registerEmail)) {
    errors.registerEmail = "Email is invalid";
  }

  if (Validator.isEmpty(data.registerPassword)) {
    errors.registerPassword = "Password field is required";
  }

  if (!Validator.isLength(data.registerPassword, { min: 6, max: 30 })) {
    errors.registerPassword = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.registerRepeatPassword)) {
    errors.registerRepeatPassword = "You have to confirm your password";
  }

  if (!Validator.equals(data.registerPassword, data.registerRepeatPassword)) {
    errors.registerRepeatPassword = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};