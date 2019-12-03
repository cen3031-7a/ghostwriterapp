var bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    uuidv4 = require('uuidv4'),
    key = require('../config/config').secrets.jwt_secret
    User = require('../models/user.server.model.js'),

    reg_validation = require('../validation/register-validation'),
    log_validation = require('../validation/login-validation');


// deals with registration
exports.register = (req, res) => {
    // checks if there are any errors and if so send them out
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
                let hashed = ""
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {throw err};
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                      if (err) {throw err};
                      
                      newUser = new User({
                        userid: uuidv4.uuid(),
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        password: hash,
                        accounttype: "free",
                        });
                    
                      newUser.save()
                      .then(newUser => res.status(200).json(newUser))
                      .catch(error => console.log(error))
                    })
                })
                
                
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
                res.status(400).redirect('/Login')
            }
            
            else{
                bcrypt.compare(req.body.password, user.password).then(isMatch => {
                    if(isMatch){
                        const load = {
                            email: user.email,
                        }
                        jwt.sign(load, key, { expiresIn: 7889232 }, // expires in 3 months
                            (err, token) => {
                                if(err) res.status(400)
                                res.status(200).json({token: token})
                            })
                    }
                    else{
                        res.status(400).redirect('/Login')
                    }
                })
            }
        }
    )
}