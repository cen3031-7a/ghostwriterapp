const passport = require('passport'),
      JwtStrategy = require("passport-jwt").Strategy,
      ExtractJwt = require("passport-jwt").ExtractJwt,
      mongoose = require("mongoose"),
      User = require("../models/user.server.model"),
      key = require("./config").secrets.jwt_secret,
      opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // header token strategy
opts.secretOrKey = key;

// Passport strategy: takes the user and auths based off the token
passport.use(
  new JwtStrategy(opts, (load, done) => {
    User.findById(load.email)
      .then(user => {
        if (user) {
          return done(null, user)
        }
        return done(null, false)
      })
      .catch(err => console.log(err))
  })
);

// google auth (buggy)

// facebook auth

module.exports = passport