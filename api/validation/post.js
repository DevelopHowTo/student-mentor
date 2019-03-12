const Validator = require('validator');
const isEmpty = require('./is_empty')

module.exports = function validatePostInput(data) {
    let errors = {}

    data.text = !isEmpty(data.text) ? data.text : '';


    if (Validator.isEmpty(data.text)) {
        errors.text = "Text Field is empty"
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}