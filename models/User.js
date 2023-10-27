const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    posts: [String],
    post_count: {
        type: Number,
        default: 0
    },
    friends: [String],
    friend_count: {
        type: Number,
        default: 0
    }
})

const User = model('User', userSchema);

module.exports = User;