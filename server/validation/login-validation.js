// Form validation
const validator = require("validator"),
      isEmpty = require('is-empty');

module.exports.validUser = (user) => {
    var err_list = {}

    if(validator.isEmpty(user.email) || !validator.isEmail(user.email)){
        err_list.email = "Need a proper, non empty email."
    }

    return {
        err_list,
        isValid: isEmpty(err_list)
    }
}