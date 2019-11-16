const passport = require('passport');
const local = require('passport-local').Strategy;
const facebook = require('passport-facebook').Strategy;
const google = require('passport-google-oauth2').Strategy;
const user = require('../models/user.server.model');
const config = require('./config');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// facebook login
exports.facebookLogin = () => {
    passport.use('facebook', facebook(
        {
            clientID: config.ids.facebook.clientid,
            clientSecret: config.ids.facebook.clientsecret,
            callbackURL: config.ids.facebook.callbackurl,
            profileFields: ["email", "name"]
        },
        (accessToken, refreshToken, profile, done) => {
            const { id, email, first_name, last_name } = profile._json;
            const userData = {
                userid: id,
                email: email,
                firstname: first_name,
                lastname: last_name
            };

            //TODO createorupdate function instead

            new user(userData).save();
            done(null, profile);
        }
      
    ))
};
// google login
exports.googleLogin = () => {
    passport.use('google', google(
        {
            clientID: config.ids.google.clientid,
            clientSecret: config.ids.google.clientsecret,
            callbackURL: config.ids.google.callbackurl,
        },
        (accessToken, refreshToken, profile, done) => {
            const {id, email, name } = profile._json;
            let name_list = name.split(" ");
            let first_name = name_list[0];
            let last_name = name_list[1];

            const userData = {
                userid: id,
                email: email,
                firstname: first_name,
                lastname: last_name
            }

            // TODO createofupdate function instead

            new user(userData).save();
            done(null, profile);
        }
    ))
};
// local login
exports.localLogin = () => {
    passport.use('local', local())
};

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });