module.exports = {
	index: (req, res, next) => {
		console.log(req.session);
		if (!req.session.userLogged) {
			res.redirect('/login');
			return;
		}
		res.render('private');
	},
};
