const google = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const user = require('../../models/user.server.model');
const config = require('../config');


passport.use(new google({
    clientID: config.ids.google.clientid,
    clientSecret: config.ids.google.clientsecretT,
    callbackURL: config.ids.google.callbackurl,
    proxy: true
  },
  function(accessToken, refreshToken, profile, cb) {
    user.findOrCreate({ userid: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

module.exports = passport;