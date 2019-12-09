// Form validation
const validator = require("validator"),
      isEmpty = require('is-empty');

module.exports.validUser = (user) => {
    var err_list = {}

    // check if the email is empty or is a proper email
    if(validator.isEmpty(user.email) || !validator.isEmail(user.email)){
        err_list.email = "Need a proper, non empty email."
    }

    // checks if password is empty
    if(validator.isEmpty(user.password)){
        err_list.email = "Empty password."
    }

    return {
        err_list,
        isValid: isEmpty(err_list)
    }
}