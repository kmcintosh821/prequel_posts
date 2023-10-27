const router = require('express').Router();
const user_controller = require('../controllers/user_controller');
const post_controller = require('../controllers/post_controller');

//Users
// All-users routes
router.route('/api/users')
    .post(user_controller.signUp)
    .get(user_controller.getAllUsers)

// Single-user routes
router.route('/api/users/:user_id')
    .get(user_controller.getProfile)
    .put(user_controller.updateProfile)
    .delete(user_controller.deleteAccount);

//Friend routes
router.route('/api/users/:user_id/friends/:friend_id')
    .post(user_controller.addFriends)
    .delete(user_controller.removeFriends)

//Thoughts
//All-thoughts routes
router.route('/api/thoughts')
    //Create Thought
    .post(post_controller.createThought)
    //Read All Thoughts
    .get(post_controller.getAllThoughts);

//Singe-thought routes
router.route('/api/thoughts/:thought_id')
    //Read one hought
    .get(post_controller.getThought)
    //Update thought
    .put(post_controller.editThought)
    //Delete thought
    .delete(post_controller.deleteThought);


//Reactions
//React To Thought
router.post('/api/thoughts/:thought_id/reactions', post_controller.react);
//Delete Reaction
router.delete('/api/thoughts/:thought_id/:reaction_id', post_controller.unreact);



module.exports = router;