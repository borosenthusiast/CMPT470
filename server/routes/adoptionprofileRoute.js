var router = require('express').Router();
var path = require('path');
var file_path = "/../views/";
var multer = require('multer');
let middleware = require('../middleware.js');
var dogforadoptionController = require('../controllers/dogforadoptionController');

router.get('/', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "adoptionprofilepage/adoptiondogprofile.html"));
});

router.get('/adoptiondogprofile.css', function(req,res){
	res.sendFile(path.join(__dirname + file_path + "adoptionprofilepage/adoptiondogprofile.css"));
});

router.get('/adoptiondogprofile.js', function(req,res){
	res.sendFile(path.join(__dirname + file_path + "adoptionprofilepage/adoptiondogprofile.js"));
});

router.get('/adoptiondogprofile.js', function(req,res){
	res.sendFile(path.join(__dirname + file_path + "adoptionprofilepage/adoptiondogprofile.js"));
});

/*router.get('../images/paw.png', function(req, res) {
	res.sendFile(path.join(__dirname + file_path + "/images/paw.png"));
});*/

router.post('/loadDog', middleware.checkToken, dogforadoptionController.loadDog); 


module.exports = router;
