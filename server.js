/**
 * Created by sohamchakraborty on 10/12/15.
 */
// BASE SETUP
// =============================================================================



var mongoose   = require('mongoose');
//console.log('mongoose = ', mongoose);
//mongoose.connect('mongodb://localhost/voteguru'); // connect to our database
mongoose.connect('mongodb://bebo:bebo@ds045464.mongolab.com:45464/heroku_17swn89w', function(err) {
    if (err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var User = require('./models/users');
var Poll = require('./models/polls');
//console.log('User = ', User);
var morgan = require('morgan');
var path = require('path');

// configuration ===========================================

// config files
//var db = require('./config/db');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

// log all requests to the console
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next) {

    console.log('something is happenning');
    next();
});

router.route('/polls')

.post(function(req, res){
        var poll = new Poll();
        poll.name=req.body.name;
        poll.Options = req.body.Options;
        poll.username = req.body.username;

        console.log(poll);
        poll.save(function(err){
            if(err)
            res.send(err);

            res.json({message: 'poll added', pollAdded: poll});
        })
    })

.get(function(req, res){
        Poll.find(function(err, polls){
            if(err)
            res.send(err);

            res.json(polls);
        })
    });

router.route('/polls/:poll_id')

    .get(function(req, res){
        Poll.findById(req.params.poll_id, function(err, poll){
            if(err)
                res.send(err);

            res.json(poll);
        })
    })



    .put(function(req, res){
        Poll.findById(req.params.poll_id, function(err, poll){
            if(err)
                res.send(err);


            poll.name = req.body.name;


            poll.Options = req.body.Options;
            poll.username = req.body.username;

            poll.save(function(err) {
                if(err)
                    res.send(err);

                res.json({message: 'poll updated', pollUpdated: poll});
            })
        })
    })

.delete(function(req, res){
        Poll.remove({
            _id: req.params.poll_id
        }, function(err, poll){
            if(err)
            res.send(err)

            res.json({message: 'poll deleted'});
        })
    });

router.route('/users')

.post(function(req, res) {
        var user = new User();
        user.name = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;
        user.admin = req.body.admin;
        user.toBeEdited = false;
        user.pollNameToBeEdited = "";

        console.log(user);
        user.save(function(err) {
            if(err)
            res.send(err);

            res.json({message: 'user created', userCreated: user});
        })
    })

.get(function(req, res){
        User.find(function(err, users) {
            if(err)
            res.send(err);

            res.json(users);
        });
    });

router.route('/users/:user_id')

    .get(function(req, res){
        User.findById(req.params.user_id, function(err, user){
            if(err)
            res.send(err);

            res.json(user);
        })
    })



    .put(function(req, res){
        User.findById(req.params.user_id, function(err, user){
            if(err)
            res.send(err);

            user.username = req.body.username;
            user.password = req.body.password;
            user.polls = req.body.polls;
            user.toBeEdited = req.body.toBeEdited;
            user.pollNameToBeEdited = req.body.pollNameToBeEdited;

            user.save(function(err) {
                if(err)
                    res.send(err);

                res.json({message: 'user updated'});
            })
        })
    })


router.get('/', function(req, res) {
    //res.render('index');
    //res.sendFile('views/index.html');
    //res.sendFile(path.join(__dirname+'views/index.html'));
    res.json({message: 'this is the backend for our voteguru application'});
});

app.use('/api', router);

app.get('*', function (req, res) {
    res.sendfile(path.join(__dirname + '/public/index.html'));
});


app.listen(port);

console.log('Magic happens on port' + port);