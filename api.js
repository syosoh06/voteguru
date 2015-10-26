//var bodyParser = require('body-parser'); 	// get body-parser
var User = require('./models/users');
//var jwt        = require('jsonwebtoken');
var config 	   = require('./config');
var Poll = require('./models/polls');

module.exports = function(app, express) {

    var router = express.Router();

    router.use(function (req, res, next) {

        console.log('something is happenning');
        next();
    });

    router.route('/polls')

        .post(function (req, res) {
            var poll = new Poll();
            poll.name = req.body.name;
            poll.Options = req.body.Options;
            poll.username = req.body.username;
            poll.alreadyVoted = req.body.alreadyVoted;

            console.log(poll);
            poll.save(function (err) {
                if (err)
                    res.send(err);

                res.json({message: 'poll added', pollAdded: poll});
            })
        })

        .get(function (req, res) {
            Poll.find(function (err, polls) {
                if (err)
                    res.send(err);

                res.json(polls);
            })
        });

    router.route('/polls/:poll_id')

        .get(function (req, res) {
            Poll.findById(req.params.poll_id, function (err, poll) {
                if (err)
                    res.send(err);

                res.json(poll);
            })
        })


        .put(function (req, res) {
            Poll.findById(req.params.poll_id, function (err, poll) {
                if (err)
                    res.send(err);


                poll.name = req.body.name;


                poll.Options = req.body.Options;
                poll.username = req.body.username;
                poll.alreadyVoted = req.body.alreadyVoted;

                poll.save(function (err) {
                    if (err)
                        res.send(err);

                    res.json({message: 'poll updated', pollUpdated: poll});
                })
            })
        })

        .delete(function (req, res) {
            Poll.remove({
                _id: req.params.poll_id
            }, function (err, poll) {
                if (err)
                    res.send(err)

                res.json({message: 'poll deleted'});
            })
        });

    router.route('/users')

        .post(function (req, res) {
            var user = new User();
            user.name = req.body.name;
            user.username = req.body.username;
            user.password = req.body.password;
            user.admin = req.body.admin;
            user.toBeEdited = false;
            user.pollNameToBeEdited = "";

            console.log(user);
            user.save(function (err) {
                if (err)
                    res.send(err);

                res.json({message: 'user created', userCreated: user});
            })
        })

        .get(function (req, res) {
            User.find(function (err, users) {
                if (err)
                    res.send(err);

                res.json(users);
            });
        });

    router.route('/users/:user_id')

        .get(function (req, res) {
            User.findById(req.params.user_id, function (err, user) {
                if (err)
                    res.send(err);

                res.json(user);
            })
        })


        .put(function (req, res) {
            User.findById(req.params.user_id, function (err, user) {
                if (err)
                    res.send(err);

                user.username = req.body.username;
                user.password = req.body.password;
                user.polls = req.body.polls;
                user.toBeEdited = req.body.toBeEdited;
                user.pollNameToBeEdited = req.body.pollNameToBeEdited;

                user.save(function (err) {
                    if (err)
                        res.send(err);

                    res.json({message: 'user updated'});
                })
            })
        })

    router.get('/', function (req, res) {
        //res.render('index');
        //res.sendFile('views/index.html');
        //res.sendFile(path.join(__dirname+'views/index.html'));
        res.json({message: 'this is the backend for our voteguru application'});
    });

return router;
}