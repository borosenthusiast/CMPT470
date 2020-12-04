var router = require('express').Router();
var viewProfileController = require('../controllers/viewprofileController');
var path = require('path');
var file_path = "/../views/";
var multer = require('multer');
let middleware = require('../middleware.js');

router.get('/', middleware.checkToken, viewProfileController.viewProfile); //sendfile in controller function

router.get('/viewprofile.css', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "viewprofilepage/viewprofile.css"));
});

router.get('/viewprofile.js', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "viewprofilepage/viewprofile.js"));
});

module.exports = router;