const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateResetInput(data) {
  let errors = { messages: [] };

  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (
    !Validator.isLength(data.password, {
      min: 6,
      max: 30
    })
  ) {
    errors.messages.push("Password must be atleast 6 character");
  }

  if (Validator.isEmpty(data.password)) {
    errors.messages.push("Password is required");
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.messages.push("Password must match");
  }

  if (Validator.isEmpty(data.password2)) {
    errors.messages.push("Confirm Password is required");
  }

  return {
    errors,
    isValid: errors.messages.length === 0
  };
};
