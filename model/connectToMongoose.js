'use strict';

const mongoose = require('mongoose');

//shut down app
mongoose.connection.on('error', (err) => {
	console.log('Connection to the database failed ', err);
	process.exit(1);
});

mongoose.connection.once('open', () => {
	console.log('Connection to MongoDB successful', mongoose.connection.name);
});

mongoose.connect(process.env.MONGODB_CONNECTION_STR, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	//useCreateIndex: true
});

module.exports = mongoose.connection;
