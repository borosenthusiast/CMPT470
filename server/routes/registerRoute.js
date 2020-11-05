var router = require('express').Router();
var path = require('path');
var file_path = "/../views/";

router.get('/', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "registrationpage/registration.html"));
});

router.get('/registration.css', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "registrationpage/registration.css"));
});

module.exports = router;