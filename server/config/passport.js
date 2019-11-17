const passport = require('passport');
const local = require('passport-local').Strategy;
const facebook = require('passport-facebook').Strategy;
const google = require('passport-google-oauth2').Strategy;
const user = require('../models/user.server.model');
const config = require('./config');
const mongoose = require('mongoose');

// add user to the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// remove user from the session
passport.deserializeUser((id, done) => {
    user.findById(id, (err, user) => {
        done(err, user);
    });
});

// local login
passport.use(new local(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    (email, password, done) => {
        user.findOne({
            email: email
        }, (err, user) => {
            if(err){
                return done(err);
            }
            if(!user){
                return done(null, false);
            }
            if(user.password != password){
                return done(null, false);
            }
            return done(null, user);
        })
    }

));

// google login

// facebook login

// logout

module.exports = passport;