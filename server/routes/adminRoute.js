var router = require('express').Router();
var path           = require('path');
var file_path      = "/../views/";
var userController = require('../controllers/userController');
var profileController = require('../controllers/profileController');
var multer = require('multer');


router.get('/userlist.css', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "userlistpage/userlist.css"));
});

router.get('/userlist.js', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "userlistpage/userlist.js"));
});

router.get('/viewprofile.css', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "viewprofilepage/viewprofile.css"));
});

router.get('/viewprofile.js', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "viewprofilepage/viewprofile.js"));
});

router.get('/', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "userlistpage/userlist.html"));
});

router.get('/view/:id', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "viewprofilepage/viewprofile.html"));
});

router.get('/view/:id/edit', function(req, res) {
	res.sendFile(path.join(__dirname + file_path + "editprofilepage/editprofile.html"));
});

router.get('/editprofile.css', function(req, res) {
	res.sendFile(path.join(__dirname + file_path + "editprofilepage/editprofile.css"));
});

router.get('/editprofile.js', function(req, res) {
	res.sendFile(path.join(__dirname + file_path + "editprofilepage/editprofile.js"));
});

let upload_userinfo = multer();
let upload_profileInfo = multer({dest: './uploads/'});

router.get('/getallusers', userController.getAllUsers);

router.get('/view/:id/userinfo', userController.getUserById);

router.get('/view/:id/profileinfo', profileController.getProfileById);

router.post('/view/:id/edit/userinfo_submit', upload_userinfo.none() ,userController.updateUser);

//router.post('/view/:id/edit/profileinfo_submit', upload_profileInfo.array('files') ,profileController.updateProfile);

router.post('/view/:id/edit/profileinfo_submit', upload_profileInfo.fields([{name:'profile_img', maxCount:1}, {name:'pet_img', maxCount:1}]) ,profileController.updateProfile);

module.exports = router;