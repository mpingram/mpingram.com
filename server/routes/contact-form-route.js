const express = require('express');
const router = express.Router();

const validator = require('validator');

const mailgunDomain = 'mpingram.net';
const mailgunApiKey = 'key-c83da186b7134a5b0a6c528d2d56a7d7';
const mailgun = require('mailgun-js')({apiKey:mailgunApiKey, domain: mailgunDomain});

// acquire POSTed form data from user and ship it off to my email
router.post('/', (req, res) => {

	const formData = {};
	formData.name = req.body.name;
	formData.email = req.body.email;
	formData.message = req.body.message;


	// construct email message from parsed input
	const email = {
		from: 'Your Website <mailgun@mpingram.net>',
		to: ['mpingram92@gmail.com', 'hi@mpingram.net'],
		subject: `[MPINGRAM.COM] New message from ${formData.name}`,
		text: `Name: ${formData.name}
Email: ${formData.email}
Message: ${formData.message}`,
	};

	// I know what I'll do! I'll turn the input into a flea!
	// and then put the input into a box, put that box into
	// another box and then I'll send the box to myself and
	// sMASH IT WITH A HAMMER! AH HA HA HA
	mailgun.messages().send(email, (err, body) => {
		if (err){
			console.log(err);
		}
	});

	// thanks, client!
	res.status(200).send();
});

module.exports = router;