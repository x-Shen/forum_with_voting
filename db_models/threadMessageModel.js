var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ThreadMessage = mongoose.model('threadmessage',
    {
        _thread: {type: Schema.Types.ObjectId, ref: 'thread'},
        message: String,
        createdAt: { type: Date, default: Date.now },
        user: Object,
        upvotes: { type:Number, default:0 }
    });

module.exports = ThreadMessage;