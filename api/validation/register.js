const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateRegisterInput(data) {
  let errors = { messages: [] };

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.mobile = !isEmpty(data.mobile) ? data.mobile : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (
    !Validator.isLength(data.name, {
      min: 2,
      max: 30
    })
  ) {
    errors.messages.push("Name must be between 2 and 30 characters");
  }

  if (Validator.isEmpty(data.name)) {
    errors.messages.push("Name Field is required");
  }
  if (!Validator.isEmail(data.email)) {
    errors.messages.push("Email is invalid");
  }

  if (Validator.isEmpty(data.email)) {
    errors.messages.push("Email Field is required");
  }

  if (!Validator.isMobilePhone(data.mobile, "any")) {
    errors.messages.push("Invalid mobile no.");
  }

  if (Validator.isEmpty(data.mobile)) {
    errors.messages.push("Mobile no. is required");
  }

  if (Validator.isEmpty(data.password)) {
    errors.messages.push("Password is required");
  }

  if (
    !Validator.isLength(data.password, {
      min: 6,
      max: 30
    })
  ) {
    errors.messages.push("Password must be atleast 6 character");
  }

  if (Validator.isEmpty(data.password2)) {
    errors.messages.push("Confirm Password is required");
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.messages.push("Password must match");
  }

  return {
    errors,
    isValid: errors.messages.length === 0
  };
};
