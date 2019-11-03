const express = require('express');
const router = express.Router();
const passport = require('passport');

// login option page
router.get('/', (req, res) => {
  res.render('dimebox_cares_login', { 
    copyrightYear: (new Date()).getFullYear(), 
    domain: "dimebox.com",
    dimeboxUrl: "https://dimebox.com"
  });
});

// passport google callback url
router.get('/auth/callback', 
    passport.authenticate( 'google', { 
      successRedirect: '/login/success',
      failureRedirect: '/login/failure',
    })
);

// passport google login
router.get('/google', passport.authenticate('google', { 
  scope: ['email', 'profile'] 
}));

// failed login page
router.get('/failure', (req, res) => {
  res.render('404', {message: 'Google login attempt failed'});
});

// succes login
router.get('/success', (req, res) => {
  res.redirect('/customer');
});

module.exports = router;