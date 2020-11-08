var router = require('express').Router();
var userController = require('../controllers/userController');

router.post('/signup', userController.signUp);

router.get('/getusersbyusername/:username', userController.getUserbyUsername);

module.exports = router;