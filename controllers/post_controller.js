const Post = require('../models/Post');

module.exports = {
    //Get all posts
    async getAllPosts(req, res) {
        const posts = await Post.find();

        res.json(posts);
    },

    //Get one post by id
    async getPost(req, res) {
        const post = await Post.find({_id: req.params.post_id});

        res.json(post);
    },

    //Create a new post
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
    
    //Edit a post
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
    },

    //React to a post
    async react(req, res) {
        //TODO
    },

    async deletePost(req, res) {
        //TODO
    },

    async unreact(req, res) {
        //TODO
    }
}