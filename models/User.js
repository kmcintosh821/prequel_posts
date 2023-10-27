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
    posts: [mongoose.ObjectId],
    post_count: {
        type: Number,
        default: 0
    },
    friends: [mongoose.ObjectId],
    friend_count: {
        type: Number,
        default: 0
    }
})

const User = model('User', userSchema);

module.exports = User;