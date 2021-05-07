var express = require('express');
var router = express.Router();

/* Get /change-locale/:locale */
router.get('/:locale', function (req, res, next) {
	const locale = req.params.locale;

	// cookie idioma
	res.cookie('nodeapi-locale', locale, { maxAge: 1000 * 60 * 60 * 24 * 20 });

	//redirect
	res.redirect(req.get('referer'));
});

module.exports = router;
