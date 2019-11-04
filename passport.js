const passport = require('passport');
const googleStrategy = require( 'passport-google-oauth2' ).Strategy;

// passport setup
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
passport.use(new googleStrategy({
  clientID:     process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/login/auth/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    if(profile._json.domain == "dimebox.com"){
      process.nextTick(function () {
        return done(null, profile);
      });
    }
    else {
      done(new Error("This page is only available for @dimebox.com domain"));
    }
  }
));

module.exports = passport;