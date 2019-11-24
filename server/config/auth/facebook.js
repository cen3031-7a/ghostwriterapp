const facebook = require('passport-facebook').Strategy;
const passport = require('passport');
const user = require('../../models/user.server.model');
const config = require('../config');


passport.use(new facebook({
    clientID: config.ids.facebook.clientid,
    clientSecret: config.ids.facebook.clientsecret,
    callbackURL: config.ids.facebook.callbackurl
  },
  function(accessToken, refreshToken, profile, cb) {
    user.findOrCreate({ userid: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

module.exports = passport;