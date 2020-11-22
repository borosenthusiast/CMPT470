var router = require('express').Router();
var petProfileController = require('../controllers/petProfileController');
var path = require('path');
var file_path = "/../views/";
var multer = require('multer');
let middleware = require('../middleware.js');

router.get('/', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "petprofilepage/petprofile.html"));
});

router.get('/petprofile.css', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "petprofilepage/petprofile.css"));
});

router.get('/petprofile.js', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "petprofilepage/petprofile.js"));
});


var upload = multer({dest: './uploads/'});


router.post('/submit', middleware.checkToken, upload.single('file'), petProfileController.submitPetProfile);


module.exports = router;