const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateForgotPassword(data) {
  let errors = { messages: [] };

  data.email = !isEmpty(data.email) ? data.email : "";

  if (!Validator.isEmail(data.email)) {
    errors.messages.push("Invalid Email Id");
  }
  if (Validator.isEmpty(data.email)) {
    errors.messages.push("Email Field is required");
  }
  return {
    errors,
    isValid: errors.messages.length === 0
  };
};
