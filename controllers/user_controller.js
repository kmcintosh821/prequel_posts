const User = require('../models/User');

module.exports = {
    //Get all users
    async getAll(req, res) {
        const users = await User.find();

        res.json(users);
    },

    //New account
    async signUp(req, res) {
        try {
            const userData = req.body;
            const newUser = await User.create(userData)
            res.json(newUser);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },
    
    //Update profile
    async update(req, res) {
        const post_id = req.params.post_id;
        const { title, post_content } = req.body;

        const updated_post = await Post.findByIdAndUpdate(post_id, {
            $push: {
                title: title,
                post_content: post_content
            }
        }, { new: true });

        res.json(updated_post);
    }
}