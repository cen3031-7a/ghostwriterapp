const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy;
const FaceBookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth").Strategy;
const mongoose = require("mongoose");
const bcrypyt = require("bcryptjs");
const User = require("../models/user.server.model.js");

// local
module.exports = () => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            console.log("That email is not registered");
            return done(null, false, {
              message: "That email is not registered"
            });
          }

          //Match password
          bcrypyt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            } else {
              console.log("Password incorrect");
              return done(null, false, { message: "Password incorrect" });
            }
          });
        })
        .catch(err => console.log(err));
    })
  );

  //facebook
  module.exports = () => {
    passport.use(new FacebookStrategy({
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "localhost:3000/users/login/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOrCreate({profile: profile}, function(err, user) {
        if (err) { return done(err); }
        bcrypyt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
    
          if (isMatch) {
            return done(null, user);
          } else {
            console.log("Password incorrect");
            return done(null, false, { message: "Password incorrect" });
          }
        });
        done(null, user);
      });
  }))};

  // google
  module.exports = () => {
    passport.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "localhost:3000/users/login/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOrCreate({googleId: profile.id}, function(err, user) {
        if (err) { return done(err); }
        bcrypyt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
    
          if (isMatch) {
            return done(null, user);
          } else {
            console.log("Password incorrect");
            return done(null, false, { message: "Password incorrect" });
          }
        });
        done(null, user);
      });
  }))};


  //Sessions
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};