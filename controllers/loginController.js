'use strict';

const { User } = require('../model');

module.exports = {
	//GET /login
	index: (req, res, next) => {
		res.locals.email = '';
		res.locals.error = '';
		res.render('login');
	},

	//POST /login
	post: async (req, res, next) => {
		try {
			const { email, password } = req.body;
			console.log(email, password);

			//search user db
			const user = await User.findOne({ email });
			console.log(user);

			//if not exist user
			if (!user || !(await user.comparePassword(password))) {
				res.locals.email = email;
				res.locals.error = 'Invalid credentials';
				res.render('login');
				return;
			}
			//user session _id
			req.session.userLogged = {
				_id: user._id,
			};
			res.redirect('/private');
		} catch (err) {
			next(err);
		}
	},

	/**
	 * GET logout
	 */

	logout: (req, res, next) => {
		req.session.regenerate((err) => {
			if (err) {
				next(err);
				return;
			}
			res.redirect('/');
		});
	},
};
