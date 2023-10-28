const Mongoose = require('mongoose')
const { model, Schema } = require('mongoose');
const dayjs = require('dayjs')

const reactionSchema = new Schema({
    reaction_body: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: dayjs()
    }
})

const thoughtSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: dayjs()
    },
    thought_text: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    reactions: [reactionSchema]
});

thoughtSchema.virtual('reactionCount').get(() => {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;