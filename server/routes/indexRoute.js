var router = require('express').Router();
var path = require('path');
var userController = require('../controllers/userController');
var file_path = "/../views/";

router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + file_path + "homepage/index.html"));
});

router.get('/homestyle.css', function(req, res) {
	res.sendFile(path.join(__dirname + file_path + "homepage/homestyle.css"));
});

router.get('/homescript.js', function(req, res) {
	res.sendFile(path.join(__dirname + file_path + "homepage/homescript.js"));
});

router.get('/images/home1.jpg', function(req, res) {
	res.sendFile(path.join(__dirname + file_path + "images/home1.jpg"));
});

router.get('/images/home2.jpg', function(req, res) {
	res.sendFile(path.join(__dirname + file_path + "images/home2.jpg"));
});


index = (req, res) => {
       res.json({
           success:true,
           message: 'Index page'
       });
}


router.post('/login', userController.logIn, index);

module.exports = router;