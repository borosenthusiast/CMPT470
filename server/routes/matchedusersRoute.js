var router = require('express').Router();
var path = require('path');
var file_path = "/../views/";
let middleware = require('../middleware.js');
var matchedusersController = require('../controllers/matchedusersController');

router.get('/', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "matcheduserspage/matchedusers.html"));
});

router.get('/matchedusers.css', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "matcheduserspage/matchedusers.css"));
});

router.get('/matchedusers.js', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "matcheduserspage/matchedusers.js"));
});


router.get('/getmatchedusers', middleware.checkToken, matchedusersController.getmatchedusers);

module.exports = router;