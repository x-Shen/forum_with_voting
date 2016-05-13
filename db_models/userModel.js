var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = mongoose.model('user',{
    email:String,
    password:String,
    karma: {type:Number, default:0}
});

module.exports = User;
