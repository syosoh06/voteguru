/**
 * Created by sohamchakraborty on 10/12/15.
 */
// BASE SETUP
// =============================================================================



var mongoose   = require('mongoose');
//console.log('mongoose = ', mongoose);



var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


//console.log('User = ', User);
var morgan = require('morgan');
var path = require('path');
var config 	   = require('./config');

// configuration ===========================================

// config files
//var db = require('./config/db');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

// log all requests to the console
app.use(morgan('dev'));

/*mongoose.connect('mongodb://localhost/voteguru', function(err) {
    if (err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
 });*/ // connect to our local database

mongoose.connect(config.database, function (err) {
    if (err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

app.use(express.static(__dirname + '/public'));

// ROUTES FOR OUR API =================
// ====================================

// API ROUTES ------------------------
var apiRoutes = require('./api')(app, express);
app.use('/api', apiRoutes);

app.get('*', function (req, res) {
    res.sendfile(path.join(__dirname + '/public/index.html'));
});


app.listen(config.port);

console.log('Magic happens on port ' + config.port);