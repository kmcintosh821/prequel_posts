const Mongoose = require('mongoose')
const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "That is not a valid email address."]
    },
    thoughts: [{
        type: Mongoose.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

userSchema.virtual('friendCount').get(() => {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;