const { model, Schema } = require('mongoose');

const postSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    post_content: {
        type: String,
        required: true
    },
    reactions: [{
        type: String
    }]

})

const Post = model('Post', postSchema);

module.exports = User;