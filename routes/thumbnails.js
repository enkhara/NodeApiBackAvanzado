const express = require('express');
const router = express.Router();
const cote = require('cote');

const requester = new cote.Requester({ name: 'thumbnail service' });

const thumbnailRequester = (image) => {
	const result = {
		type: 'thumbnail converter',
		image: image,
	};

	requester.send(result, (done) => {
		console.log(`convert ${image} = ${result} ${done}`);
	});
};

module.exports = thumbnailRequester;
