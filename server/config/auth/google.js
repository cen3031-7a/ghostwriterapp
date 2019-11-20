const google = require('passport-google-oauth2').Strategy;
const passport = require('passport');
const mongoose = require('mongoose');
const user = require('../../models/user.server.model');
const config = require('../config');


passport.use(new google(
    {
        clientID: config.ids.google.clientid,
        clientSecret: config.ids.google.clientsecret,
        callbackURL: config.ids.google.callbackurl
    },
    (request, accesstoken, refreshtoken, profile, done) => {
        let name = profile.name
        let first_name, last_name = name.split(" ");
        let email = profile.emails[0];

        console.log(name);

        let user = {
            userid: profile.id,
            firstname: first_name,
            lastname: last_name,
            email: email,
            token: accesstoken
        }

        user.findOrCreate({ userid: profile.id }, function (err, user) {
            return done(null, user);
        });
    }
))

module.exports = passport;