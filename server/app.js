const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');



// server
// =========

const app = express();
const contactFormRouter = require('./routes/contact-form-route');

// utils
// -------
app.use(helmet());
app.use(favicon(path.join(__dirname,'dist','favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


// routes
// -------------
// contact form submission
app.use('/contact', contactFormRouter);


// static
// ------------

// in development
if (app.get('env').trim() === 'development'){

	// use dev-only client directory as client side
	app.use(express.static(path.join(__dirname, '../client')));
	app.use(express.static(path.join(__dirname, '../client/app')));
	app.use(express.static(path.join(__dirname, '../client/tmp')));

	// print stacktrace on error
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}


// in production
if (app.settings.env === 'production'){

	// serve production version of app
	app.use(express.static('./dist'));


	// don't print stacktrace
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});
}


// ========
console.log('App running in ' + app.settings.env + ' mode.');
module.exports = app;
