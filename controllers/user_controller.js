const User = require('../models/User');

module.exports = {

    // '/users' routes

    // POST
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

    // GET
    async getAllUsers(req, res) {
        const users = await User.find();

        res.json(users);
    },




    // '/users/:user_id' routes

    // GET
    async getProfile(req, res) {
        const users = await User.findById(req.params.user_id);

        res.json(users);
    },
    
    // PUT
    async updateProfile(req, res) {
        const user_id = req.params.user_id;
        const { username, email } = req.body;

        const updatedProfile = await User.findByIdAndUpdate(user_id, {
            $push: {
                username: username,
                email: email
            }
        }, { new: true });

        res.json(updatedProfile);
    },

    // DELETE
    async deleteAccount(req, res) {
        await User.deleteOne({ _id: req.params.user_id })
    },

    



    // '/users/:user_id/friends/:friend_id' routes

    // POST
    async addFriends(req, res) {
        const firstUser = await User.findById(req.params.user_id)
        const secondUser = await User.findById(req.params.friend_id)
        
        firstUser.friends.push({ _id: secondUser._id })
        secondUser.friends.push({ _id: firstUser._id })
    },

    // DELETE
    async removeFriends(req, res) {
        const firstUser = await User.findById(req.params.user_id)
        const secondUser = await User.findById(req.params.friend_id)
        
        firstUser.friends.pull({ _id: secondUser._id })
        secondUser.friends.pull({ _id: firstUser._id })
    }
}