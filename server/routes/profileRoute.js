var router = require('express').Router();
var profileController = require('../controllers/profileController');
var path = require('path');
var file_path = "/../views/";


router.get('/', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "profilepage/profile.html"));
});

router.get('/profile.css', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "profilepage/profile.css"));
});

router.get('/profile.js', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "profilepage/profile.js"));
});

router.post('/submit', profileController.submitProfile);


module.exports = router;