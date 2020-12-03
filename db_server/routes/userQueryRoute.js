var router = require('express').Router();
var userController = require('../controllers/userController');

router.post('/signup', userController.signUp);

router.get('/getusersbyusername/:username', userController.getUserbyUsername);

router.get('/getusersbyid/:id', userController.getUserbyId);

router.get('/getallusers', userController.getAllUsers);

module.exports = router;