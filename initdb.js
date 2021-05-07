'use strict';

//require('dotenv').config();

// //load modules
// const mongoose = require('mongoose');
// const { dropCollection, get } = require('./model/connectToMongoose');
// const testAdvertisements = require('./advertisements.json');
// //load model
// const Advertisement = require('./model/Advertisement');

const { mongoose, connectMongoose, User, Advertisement } = require('./models');

seedDB().catch((err) => console.log(err));

async function getAdvertisements() {
	let totalCreated = 0;
	for (let advertisement of testAdvertisements.advertisements) {
		let advertisementToAdd = new Advertisement(advertisement);
		await advertisementToAdd.save();
		totalCreated++;
	}
	return totalCreated;
}

async function seedDB() {
	//connect to db
	await mongoose.connection.dropCollection('advertisements', function () {
		console.log('dropCollection success');
	});
	const adverstisementCreated = await getAdvertisements();
	console.log(
		`Has been created ${adverstisementCreated} advertisements successful`
	);
	mongoose.connection.close();
	console.log('Disconnet to db');
}
