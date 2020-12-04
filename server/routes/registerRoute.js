var router         = require('express').Router();
var userController = require('../controllers/userController');
var path           = require('path');
var file_path      = "/../views/";


router.get('/', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "registrationpage/registration.html"));
});

router.get('/registration.css', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "registrationpage/registration.css"));
});

router.get('/registration.js', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "registrationpage/registration.js"));
});

router.post('/submit', userController.signUp);

module.exports = router;