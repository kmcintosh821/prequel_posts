const User = require('../models/User');

module.exports = {

    // '/users' routes

    // POST
    async signUp(req, res) {
        try {
            const userData = req.body;
            const newUser = await User.create(userData)
            res.status(200).json(newUser);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },

    // GET
    async getAllUsers(req, res) {
        const users = await User.find();

        res.status(200).json(users);
    },




    // '/users/:user_id' routes

    // GET
    async getProfile(req, res) {
        try {
            const users = await User.findById(req.params.user_id);
    
            res.status(200).json(users);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message })
        }
    },
    
    // PUT
    async updateProfile(req, res) {
        try {
            const user_id = req.params.user_id;
            const { username, email } = req.body;
    
            const profile = await User.findByIdAndUpdate(user_id, {
                username: username,
                email: email
            });

            profile.save()
            updatedProfile = await User.findById(user_id)
    
            res.status(200).json(updatedProfile);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message })
        }
    },

    // DELETE
    async deleteAccount(req, res) {
        try {
            const user = await User.findById(req.params.user_id)
            await User.deleteOne({ _id: req.params.user_id })

            res.status(200).json({ result: `${user.username} deleted!`});

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message })
        }
    },

    // '/users/:user_id/friends/:friend_id' routes

    // POST
    async addFriends(req, res) {
        try {
            
            const firstUser = await User.findById(req.params.user_id)
            const secondUser = await User.findById(req.params.friend_id)
            
            firstUser.friends.push({ _id: secondUser._id })
            firstUser.__v = firstUser.friends.length
            secondUser.friends.push({ _id: firstUser._id })
            secondUser.__v = secondUser.friends.length

            firstUser.save();
            secondUser.save();

            res.status(200).json({firstUser, secondUser});
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message })
        }
    },

    // DELETE
    async removeFriends(req, res) {
        try {
            
            const firstUser = await User.findById(req.params.user_id)
            const secondUser = await User.findById(req.params.friend_id)
            
            firstUser.friends.pull({ _id: secondUser._id })
            firstUser.__v = firstUser.friends.length
            secondUser.friends.pull({ _id: firstUser._id })
            secondUser.__v = secondUser.friends.length

            firstUser.save();
            secondUser.save();

            res.status(200).json({firstUser, secondUser});
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message })
        }
    }
}