//services to create thumbnails

const cote = require('cote');
const Jimp = require('jimp');

//declarate microservices

const responder = new cote.Responder({ name: ' thumbnails services' });

//logica microservices
responder.on('thumbnail converter', async (req, done) => {
	console.log('req en thumbnail', req);
	const { image } = req;
	console.log('service:', image);

	const imageUrl = `public\\images\\${image}`;
	//resize
	Jimp.read(imageUrl)
		.then((imageToConvert) => {
			console.log(`esto es dentro de jimp ${imageToConvert}`);
			//TODO: cambiar la ruta de write para que se guarde donde toca
			imageToConvert
				.resize(100, 100)
				.write(`public\\thumbnail-images\\thumbnail_${image}`);
		})
		.catch((err) => {
			console.error(err);
		});

	const result = 'thumbnails services';
	await done(result);
});
