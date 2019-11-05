const router = require('express').Router();
const passport = require('../lib/passport');
const auth = require('../lib/jwt');

router.post('/user', auth.optional, (req, res, next) => {
	const { user } = req.body;

	if(!user.email) {
		return res.status(422).json({
		  errors: {
			email: 'is required',
		  },
		});
	}
	
	if(!user.password) {
		return res.status(422).json({
			errors: {
				password: 'is required',
			},
		});
	}

	return passport.authenticate('local', { session: false }, (err, authUser, info) => {
		if(err) throw err;

		if (authUser) {
			const user = authUser;
			user.token = authUser.generateJWT();

			return res.json(({ user: user.toAuthJSON() }));
		}

		return res.status(422).json({
			errors: 'Auth failed',
		  });
	})(req,res,next)
});

router.get('/google', passport.authenticate('google', {
	scope: ['email', 'profile']
  })
);

router.get('/auth/callback', passport.authenticate('google'), (req, res) => {
const cookie = req.cookies['express:sess'];

res.cookie('token', cookie);
res.redirect('/dashboard');
});

module.exports = router;