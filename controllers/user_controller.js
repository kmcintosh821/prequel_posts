const User = require('../models/User');

module.exports = {
    //Get all users
    async getAllUsers(req, res) {
        const users = await User.find();

        res.json(users);
    },

    //Get one user by username
    async getProfile(req, res) {
        const users = await User.find({username: req.params.username});

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

    //Update Friends
    async updateFriends(req, res) {
        //TODO
    },

    //Delete account
    async deleteAccount(req, res) {
        await User.deleteOne({ _id: req.params.user_id })
    }
}