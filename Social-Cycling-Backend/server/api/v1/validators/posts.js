const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.startDate = !isEmpty(data.startDate) ? data.startDate : "";
  data.startTime = !isEmpty(data.startTime) ? data.startTime : "";
  data.startLocation = !isEmpty(data.startLocation) ? data.startLocation : "";
  data.endLocation = !isEmpty(data.endLocation) ? data.endLocation : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  const maxChar = 40;
  if (Validator.isLength(data.title, { min: maxChar })) {
    errors.title = `Title cannot be longer than ${maxChar} characters`;
  }

  if (Validator.isEmpty(data.startDate)) {
    errors.startDate = "Start date is required";
  }

  if (Validator.isEmpty(data.startTime)) {
    errors.startTime = "Start time is required";
  }

  if (Validator.isEmpty(data.startLocation)) {
    errors.startLocation = "Start location is required";
  }

  if (Validator.isEmpty(data.endLocation)) {
    errors.endLocation = "End location is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};