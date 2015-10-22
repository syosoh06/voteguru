/**
 * Created by sohamchakraborty on 10/12/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    polls: Array,
    toBeEdited: Boolean,
    pollNameToBeEdited: String
});
//console.log('userschema created in users.js is', UserSchema);
module.exports = mongoose.model('User', UserSchema);