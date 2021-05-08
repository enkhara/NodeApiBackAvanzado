'use strict';

require('dotenv').config();

const testAdvertisements = require('./advertisements.json');

const { mongoose, connectMongoose, User, Advertisement } = require('./model');

//seedDB().catch((err) => console.error(err));
main().catch((err) => console.error(err));

async function main() {
	await initUsers();
	await seedDB();

	mongoose.connection.close();
	console.log('Disconnet to db');
}

async function initUsers() {
	const { deletedCount } = await User.deleteMany();
	console.log(`Delete ${deletedCount} user${deletedCount > 1 ? 's' : ''}`);

	const result = await User.insertMany({
		email: 'user@example.com',
		password: await User.hashPassword('1234'),
	});
	console.log(result);
	console.log(`Insert ${result.length} user${result.length > 1 ? 's' : ''}`);
}

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
	const advertisementCreated = await getAdvertisements();
	console.log(
		`Has been created ${advertisementCreated} advertisements successful`
	);
	//mongoose.connection.close();
}
