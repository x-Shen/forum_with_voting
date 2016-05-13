var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Thread = mongoose.model('thread',
    {
        title: String,
        createdAt: { type: Date, default: Date.now, index: true },
        user: Object,
        upvotes: { type:Number, default:0 }
    });

module.exports = Thread;