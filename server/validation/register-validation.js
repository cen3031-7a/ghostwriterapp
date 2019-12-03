// Form validation
const validator = require("validator");
      isEmpty = require("is-empty");

module.exports.validUser = (user) => {
    var err_list = {}

    if(validator.isEmpty(user.firstname) || validator.isEmpty(user.lastname)){
        err_list.name = "Need first and last name."
    }

    if(validator.isEmpty(user.email) || !validator.isEmail(user.email)){
        err_list.email = "Need a proper, non empty email."
    }

    if(validator.isEmpty(user.password) || validator.isEmpty(user.confirm_password)){
        err_list.empty_password = "Need both password fields"
    }

    if(!validator.equals(user.password, user.confirm_password)){
        err_list.not_matching = "Passwords dont match"
    }

    return {
        err_list,
        isValid: isEmpty(err_list)
    }
}