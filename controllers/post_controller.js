const Thought = require('../models/Thought');
const User = require('../models/User')

module.exports = {
    //Get all thoughts
    async getAllThoughts(req, res) {
        const thoughts = await Thought.find();

        res.status(200).json(thoughts);
    },

    //Get one thought by id
    async getThought(req, res) {
        const thought = await Thought.find({_id: req.params.thought_id});

        res.status(200).json(thought);
    },

    //Create a new thought
    async createThought(req, res) {
        try {
            const thoughtData = req.body;
            const newThought = await Thought.create(thoughtData)
            const user = await User.findOneAndUpdate({ username: req.body.username }, { $push: { thoughts: newThought._id}})
            res.status(200).json({newThought, user});
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },
    
    //Edit a thought
    async editThought(req, res) {
        const thought_id = req.params.thought_id;
        const { title, thought_text } = req.body;

        const thought = await Thought.findByIdAndUpdate(thought_id, {
            title: title,
            thought_text: thought_text

        }, { new: true });
        const updated_thought = await thought.save()

        res.status(200).json(updated_thought);
    },

    async deleteThought(req, res) {
        try {
            const thought_id = req.params.thought_id;
            deletedThought = await Thought.find({ _id: thought_id })
            const user = await User.findOneAndUpdate({ username: deletedThought.username }, { $pull: { thoughts: thought_id}})
            await Thought.deleteOne({ _id: thought_id })

            res.status(200).json({ result: `Thought ${thought_id} deleted!`});

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },

    //React to a thought
    async react(req, res) {
        const thought_id = req.params.thought_id;
        const reaction = req.body

        const post_reaction = await Thought.findByIdAndUpdate(thought_id, {
            $push: {
                reactions: { username: reaction.username, reaction_body: reaction.reaction_body }
                
            }
        })
        post_reaction.save()
        const new_reaction = await Thought.findById(thought_id)

        res.status(200).json(new_reaction)
    },

    async unreact(req, res) {
        try {
            const thought_id = req.params.thought_id;
    
            const removedReaction = await Thought.findByIdAndUpdate(thought_id, {
                $pull: {
                    reactions: { _id: req.params.reaction_id }
                    }
                }
            )
            await removedReaction.save()

            res.status(200).json({ result: `Reaction ${req.params.reaction_id} deleted!`});
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        } 
    }
}