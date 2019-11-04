const passport = require('passport');
const googleStrategy = require( 'passport-google-oauth2' ).Strategy;

const { User } = require('./db');
 
passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/login/auth/callback",
    passReqToCallback: true
  },
  (request, accessToken, refreshToken, profile, done) => {
    User.findOne({googleId : profile.id}).then((res) => {
      if (res) {
        console.log(res);
      } else {
        new User({
          username: profile.email,
          googleId: profile.id
        }).save().then((res) => {console.log('User added' + res._id)});
      }
    }).catch(err => {throw err});
  }
));

module.exports = passport;