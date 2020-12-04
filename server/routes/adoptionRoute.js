var router = require('express').Router();
var path = require('path');
var file_path = "/../views/";
var multer = require('multer');
let middleware = require('../middleware.js');
var dogforadoptionController = require('../controllers/dogforadoptionController');

router.get('/', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "adoptionpage/adopt.html"));
});

router.get('/adopt.css', function(req,res){
	res.sendFile(path.join(__dirname + file_path + "adoptionpage/adopt.css"));
});

router.get('/adopt.js', function(req,res){
	res.sendFile(path.join(__dirname + file_path + "adoptionpage/adopt.js"));
});


router.get('/alldogs',  dogforadoptionController.getAlldogs);


module.exports = router;
