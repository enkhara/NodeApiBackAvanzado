'use strict';

const i18n = require('i18n');
const path = require('path');
const { model } = require('../model/connectToMongoose');

i18n.configure({
	locales: ['en', 'es'],
	directory: path.join(__dirname, '..', 'locales'),
	defaultLocale: 'es',
	autoReload: true,
	syncFiles: true,
	cookie: 'nodeapi-locale',
});

i18n.setLocale('es');

module.exports = i18n;
