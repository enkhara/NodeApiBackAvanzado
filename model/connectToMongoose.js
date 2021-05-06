'use strict';

const mongoose = require('mongoose');

//shut down app
mongoose.connection.on('error', err => {
    console.log('Connection to the database failed ', err);
    process.exit(1);
});

mongoose.connection.once('open', () => {
    console.log('Connection to MongoDB successful', mongoose.connection.name);
});

mongoose.connect('mongodb://localhost/nodepop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose.connection;