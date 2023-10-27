const Thought = require('../models/Thought');

module.exports = {
    //Get all thoughts
    async getAllThoughts(req, res) {
        const thoughts = await Thought.find();

        res.json(thoughts);
    },

    //Get one thought by id
    async getThought(req, res) {
        const thought = await Thought.find({_id: req.params.thought_id});

        res.json(thought);
    },

    //Create a new thought
    async createThought(req, res) {
        try {
            const thoughtData = req.body;
            const newThought = await Thought.create(thoughtData)
            res.json(newThought);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },
    
    //Edit a thought
    async editThought(req, res) {
        const thought_id = req.params.thought_id;
        const { title, thought_text } = req.body;

        const updated_thought = await Thought.findByIdAndUpdate(thought_id, {
            $push: {
                title: title,
                thought_text: thought_text
            }
        }, { new: true });

        res.json(updated_thought);
    },

    async deleteThought(req, res) {
        try {
            const thought_id = req.params.thought_id;
            await Thought.deleteOne({ _id: thought_id })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },

    //React to a thought
    async react(req, res) {
        const thought_id = req.params.thought_id;
        const { reaction } = req.body

        const change_reaction = await Post.findByIdAndUpdate(thought_id, {
            $push: {
                reactions: reaction
                
            }
        })
    },

    async unreact(req, res) {
        try {
            const thought_id = req.params.thought_id;
    
            await Post.findByIdAndUpdate(thought_id, {
                $pull: {
                    reactions: [{_id: req.params.reaction_id}]
                    }
                }
            )
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        } 
    }
}