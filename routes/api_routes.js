const router = require('express').Router();
const user_controller = require('../controllers/user_controller');
const post_controller = require('../controllers/post_controller');

//User Routes
//Create User
router.post('/users', user_controller.signUp);

//Read All Users
router.get('/users', user_controller.getAllUsers)

//Find One User
router.get('/users/:username', user_controller.getProfile)

//Update User Info
router.put('/users/:username', user_controller.updateProfile);

//Update User Friend Lists
router.put('/friends/:username1/:username2', user_controller.updateFriends)

//Delete User Account
router.delete('/users/:username', user_controller.deleteAccount);

//Post Routes

//Create Post
router.post('/posts', post_controller.create);

//Read All Posts
router.get('/posts', post_controller.getAllPosts);

//Read One Post
router.get('/posts/:post_id', post_controller.getPost);

//Edit Post
router.put('/posts/:post_id', post_controller.edit);

//React To Post
router.put('/posts/:post_id/react', post_controller.react);

//Delete Post
router.delete('/posts/:post_id', post_controller.deletePost);

//Delete Reaction
router.delete('/posts/:post_id/:reaction_id', post_controller.unreact);



module.exports = router;