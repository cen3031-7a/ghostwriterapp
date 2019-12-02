var bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    key = require('../config/config').secrets.jwt_secret
    User = require('../models/user.server.model.js'),
    reg_validation = require('../validation/register-validation'),
    log_validation = require('../validation/login-validation');


// deals with registration
exports.register = (req, res) => {
    // checks if there are any errors and if so send them out
    console.log(req.body.firstname)
    const {errs, isValid} = reg_validation.validUser(req.body)
    
    if(!isValid){
        return res.status(400).json(errs)
    }

    User.findOne({email: req.body.email})
        .then(user => {
            if(user){
                res.status(400).json("Email already on file")
            }
            else{
                const newUser = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: req.body.password,
                    accounttype: "free",
                }
                newUser.save()
                .then(res.json(user))
                .catch(error => console.log(error))
            }
    })

}

// deals with login
exports.login = (req, res) => {
    const {errs, isValid} = log_validation.validUser(req.body)
    
    if(!isValid){
        return res.status(400).json(errs)
    }

    User.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                res.status(400).json("No user found")
            }
            else{
                bcrypt.compare(req.body.password, user.password).then(isMatch => {
                    if(isMatch){
                        const load = {
                            email: user.email,
                            accounttype: user.accounttype
                        }

                        jwt.sign(load, key, { expiresIn: 7889232 }, // expires in 3 months
                            (err, token) => {
                                res.json({token: 'Bearer' + token})
                            })
                    }
                    else{
                        res.status(400).json({bad_password: "incorect password"})
                    }
                })
            }
        }
    )
}