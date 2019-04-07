const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateLoginInput(data) {
  let errors = { messages: [] };

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.messages.push("Email is invalid");
  }
  if (Validator.isEmpty(data.email)) {
    errors.messages.push("Email Field is required");
  }

  if (Validator.isEmpty(data.password)) {
    errors.messages.push("Password is required");
  }

  return {
    errors,
    isValid: errors.messages.length === 0
  };
};
