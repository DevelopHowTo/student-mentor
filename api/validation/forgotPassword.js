const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateForgotPassword(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid Email Id";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email Field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
