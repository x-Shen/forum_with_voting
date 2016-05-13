var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ThreadMessage = mongoose.model('threadmessage',
    {
        _post: {type: Schema.Types.ObjectId, ref: 'post'},
        message: String,
        createdAt: { type: Date, default: Date.now },
        user: Object,
        upvotes: { type:Number, default:0 }
    });

module.exports = PostMessage;