var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { 
        console.log("err");
        return done(err); }
      // Return if user not found in database
      if (!user) {
        console.log("no user");
        return done(null, false, {
          message: 'User not found'

        });
      }
      // Return if password is wrong
      if (!user.validPassword(password)) {
        console.log("no pass");

        return done(null, false, {
          message: 'Password is wrong'
        });
      }

      // If credentials are correct, return the user object
      console.log("correct");
      return done(null, user);
    });
  }
));