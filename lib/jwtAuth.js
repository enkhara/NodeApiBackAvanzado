'use strict';

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	//recoger el jwtToken del header
	const jwtToken =
		req.get('Authorization') || req.query.token || req.body.token;

	//comprobar que existe token
	if (!jwtToken) {
		const error = new Error('no token provided');
		error.status = 401;
		next(error);
		return;
	}

	// que sea valido
	jwt.verify(jwtToken, process.env.JWT_SECRET, (err, payload) => {
		if (err) {
			err.status = 401;
			next(err);
			return;
		}
		req.apiAuthUserId = payload._id;
		next();
	});
};
