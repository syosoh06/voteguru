var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollsSchema = new Schema({
name: String,
    Options: Array,
    username: String,
    alreadyVoted: Array
});

module.exports = mongoose.model('poll', pollsSchema);