const router = require('express').Router();
const user_controller = require('../controllers/user_controller');

//Retrieve All Users
router.get('/users', user_controller.getAll)

// New User
router.post('/users', user_controller.create);

//Update User Info
router.put('/users/:username', user_controller.update);

module.exports = router;