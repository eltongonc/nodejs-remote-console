const passport = require('passport');
const googleStrategy = require( 'passport-google-oauth2' ).Strategy;

const { User } = require('./db');
 

// Serialize user id to cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user id from cookie
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/login/auth/callback",
    passReqToCallback: true
  },
  (request, accessToken, refreshToken, profile, done) => {
    User.findOne({googleId : profile.id}).then((currentUser) => {
      if (currentUser) {
        console.log(currentUser);
        done(null, currentUser)
      } else {
        new User({
          username: profile.email,
          googleId: profile.id
        }).save().then((newUser) => {
          done(null, newUser)
        }).catch(err => { throw err });
      }
    }).catch(err => { throw err });
  }
));

module.exports = passport;