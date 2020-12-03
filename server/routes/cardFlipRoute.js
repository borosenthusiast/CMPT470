var router = require('express').Router();
var path = require('path');
var file_path = "/../views/";
let middleware = require('../middleware.js');
var cardflipController = require('../controllers/cardflipController');

router.get('/', function(req,res) {
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

router.get('/getcards', middleware.checkToken, cardflipController.getcards);

router.post('/pushtoaddedlist', middleware.checkToken, cardflipController.pushtoaddedlist);

router.post('/checkifmatch', middleware.checkToken, cardflipController.checkifmatch);

router.post('/chosenIdpriority', middleware.checkToken, cardflipController.chosenIdpriority);


module.exports = router;