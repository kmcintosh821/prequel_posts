const User = require('../models/User');

module.exports = {
    //Get all users
    async getAll(req, res) {
        const posts = await Post.find();

        res.json(posts);
    },

    //New account
    async create(req, res) {
        try {
            const postData = req.body;
            const newPost = await Post.create(postData)
            res.json(newShop);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },
    
    //Update profile
    async edit(req, res) {
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