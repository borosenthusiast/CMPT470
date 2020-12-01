var router = require('express').Router();
var path = require('path');
var file_path = "/../views/";
var multer = require('multer');
let middleware = require('../middleware.js');
var dogforadoptionController = require('../controllers/dogforadoptionController');

router.get('/', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "newdogforadoptionpage/newdogforadoption.html"));
});

router.get('/newdogforadoption.css', function(req,res){
	res.sendFile(path.join(__dirname + file_path + "newdogforadoptionpage/newdogforadoption.css"));
});

router.get('/newdogforadoption.js', function(req,res){
	res.sendFile(path.join(__dirname + file_path + "newdogforadoptionpage/newdogforadoption.js"));
});


const upload = multer({ dest: './uploads/'});

router.post('/submit', middleware.checkToken, upload.array("img"), dogforadoptionController.submitDogforadoption);


module.exports = router;
