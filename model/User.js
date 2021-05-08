'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { user } = require('./connectToMongoose');

const userSchema = mongoose.Schema({
	email: { type: String, unique: true },
	password: String,
});

userSchema.statics.hashPassword = function (myPlaintextPassword) {
	return bcrypt.hash(myPlaintextPassword, 10);
};

userSchema.methods.comparePassword = function (myPlaintextPassword) {
	return bcrypt.compare(myPlaintextPassword, this.password);
};
const User = mongoose.model('User', userSchema);

module.exports = User;
