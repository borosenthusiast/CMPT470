var router = require('express').Router();
var userController = require('../controllers/userController');
var path = require('path');
var file_path = "/../views/";


router.get('/', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "profilepage/profile.html"));
});

router.get('/profile.css', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "profilepage/profile.css"));
});


module.exports = router;