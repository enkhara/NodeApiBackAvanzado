'use strict';

const { User } = require('../model');

module.exports = {
	index: (req, res, next) => {
		res.locals.email = '';
		res.locals.error = '';
		res.render('login');
	},

	post: async (req, res, next) => {
		try {
			const { email, password } = req.body;
			console.log(email, password);

			//search user db
			const user = await User.findOne({ email });
			console.log(user);
			//console.log(user.password !== password);

			//if not exist user
			if (!user || user.password !== password) {
				res.locals.email = email;
				res.locals.error = 'Invalid credentials';
				res.render('login');
				return;
			}
			res.send('privada');
		} catch (err) {
			next(err);
		}
	},
};
