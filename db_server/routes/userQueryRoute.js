var router = require('express').Router();
var userController = require('../controllers/userController');

router.post('/signup', userController.signUp);

//router.get('./getAllUsers', userController.getAllUsers);

module.exports = router;