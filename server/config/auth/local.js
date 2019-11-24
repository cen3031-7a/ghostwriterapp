const local = require('passport-local').Strategy;
const passport = require('passport');
const user = require('../../models/user.server.model');

passport.use(new local(
    function(username, password, done) {
      user.findOne({ userid: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.checkPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

  module.exports = passport;