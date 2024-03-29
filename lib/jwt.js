const jwt = require('express-jwt');

const getTokenFromHeaders = (req) => {
	const { authorization } = req.headers;

	// return the token itself
	if (authorization && authorization.split(' ')[0] === 'Token') {
		return authorization.split(' ')[1];
	}

	return null;
}


const auth = {
	required: jwt({
		secret: process.env.JWT_SECRET,
		userProperty: 'payload',
		getToken: getTokenFromHeaders,
	}),
	optional: jwt({
		secret: process.env.JWT_SECRET,
		userProperty: 'payload',
		getToken: getTokenFromHeaders,
		credentialsRequired: false,
	}),
}

module.exports = auth;