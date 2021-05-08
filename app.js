var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const sessionAuth = require('./lib/sessionAuthMiddleware');
const loginController = require('./controllers/loginController');
var app = express();
//connect to db
require('./model/connectToMongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

// declaramos una variable global para todas las vistas
app.locals.title = 'NodePop';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * RUTAS del API
 */
app.use('/api/advertisements', require('./routes/api/advertisements'));
// Setup de i18n
const i18n = require('./lib/i18nConfigure');
app.use(i18n.init);

/**
 *  Middleware de Gestion de sesiones del websiteExpress session
 */
app.use(
	session({
		name: 'nodeapi-session',
		secret: 'dfkjs23424E$EFWFDFSFSsjfkjswe654',
		saveUninitialized: true,
		resave: false,
		cookie: {
			secure: process.env.NODE_ENV !== 'development',
			maxAge: 1000 * 60 * 60 * 24 * 2,
		},
	})
);

/**
 * session for all views
 */
app.use((req, res, next) => {
	res.locals.session = req.session;
	next();
});

/**
 * RUTAS del WEBSITE
 */

//routers
app.use('/', require('./routes/index'));
app.use('/change-locale', require('./routes/change-locale'));
app.get('/login', loginController.index);
app.post('/login', loginController.post);
app.get('/logout', loginController.logout);
app.get(
	'/private',
	sessionAuth,
	require('./controllers/privateController').index
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	res.status(err.status || 500);

	if (isApiRequest(req)) {
		res.json({ error: err.message });
		return;
	}

	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.render('error');
});

//comprobar de donde viene la peticion
function isApiRequest(req) {
	return req.originalUrl.indexOf('/api/') === 0;
}

module.exports = app;
