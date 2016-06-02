var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');


// server
var app = express();
app.use(favicon(path.join(__dirname,'dist','favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


// If in development
// -----------------------
if (app.get('env') === 'development'){

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


// If in production
// -----------------------
if (app.get('env') === 'production'){

	// use dist directory as client side (contains minified files)
	app.use(express.static(path.join(__dirname, '/dist')));

	// don't print stacktrace
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});
}


// routes
// TODO: there's something im not grokking here
var routes = require('./router/index.js');
var router = require('./router')(app);

// when booted:
console.log('App running in ' + app.settings.env + ' mode.');
module.exports = app;
