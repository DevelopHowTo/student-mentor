const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateEducationInput(data) {
  let errors = { messages: [] };

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.school)) {
    errors.messages.push("School Field is required");
  }

  if (Validator.isEmpty(data.degree)) {
    errors.messages.push("Degree Field is required");
  }

  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.messages.push("Study Field is required");
  }
  if (Validator.isEmpty(data.from)) {
    errors.messages.push("From Date Field is required");
  }

  return {
    errors,
    isValid: errors.messages.length === 0
  };
};
