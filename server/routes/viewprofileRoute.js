var router = require('express').Router();
var profileController = require('../controllers/viewprofileController');
var path = require('path');
var file_path = "/../views/";
var multer = require('multer');
let middleware = require('../middleware.js');

router.get('/', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "profilepage/profile.html"));
});

router.get('/profile.css', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "profilepage/profile.css"));
});

router.get('/profile.js', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "profilepage/profile.js"));
});


var upload = multer({dest: './uploads/'});


router.post('/submit', middleware.checkToken, upload.single('file'), profileController.submitProfile);


module.exports = router;