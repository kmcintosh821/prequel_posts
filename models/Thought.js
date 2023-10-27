const { model, Schema } = require('mongoose');
const dayjs = require('dayjs')

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

thoughtSchema.virtual(reactionCount).get(() => {
    return this.reactions.length;
});

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new Schema.Types.ObjectId()
    },
    reactionBody: {
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

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;