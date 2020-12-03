var router = require('express').Router();
var path           = require('path');
var file_path      = "/../views/";
var userController = require('../controllers/userController');

router.get('/', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "userlistpage/userlist.html"));
});

router.get('/userlist.css', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "userlistpage/userlist.css"));
});

router.get('/userlist.js', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "userlistpage/userlist.js"));
});

router.get('/allusers', userController.getAllUsers);

module.exports = router;