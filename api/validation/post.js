const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validatePostInput(data) {
  let errors = { messages: [] };

  data.text = !isEmpty(data.text) ? data.text : "";

  if (Validator.isEmpty(data.text)) {
    errors.messages.push("Text Field is empty");
  }

  return {
    errors,
    isValid: errors.messages.length === 0
  };
};
