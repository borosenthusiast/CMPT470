var router = require('express').Router();
var path = require('path');
var middleware = require('../middleware.js');
var file_path = "/../views/";

router.get('/', middleware.checkToken,  function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "cardflippage/cardflip.html"));
});

router.get('/cardflip.css', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "cardflippage/cardflip.css"));
});

router.get('/cardflip.js', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "cardflippage/cardflip.js"));
});

router.get('/images/paw.png', function(req, res) {
	res.sendFile(path.join(__dirname + file_path + "images/paw.png"));
});

router.get('/images/notchoosebutton.png', function(req, res) {
	res.sendFile(path.join(__dirname + file_path + "images/notchoosebutton.png"));
});

router.get('/images/choosebutton.png', function(req, res) {
	res.sendFile(path.join(__dirname + file_path + "images/choosebutton.png"));
});

module.exports = router;