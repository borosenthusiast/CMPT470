var router = require('express').Router();
var path = require("path");
var file_path = "/../views/";

router.get('/', function(req, res) {
    console.log("about us router", req.originalUrl);
    res.sendFile(path.join(__dirname + file_path + "aboutuspage/about.html"));
});

router.get('/about.css', function(req, res) {
    res.sendFile(path.join(__dirname + file_path + "aboutuspage/about.css"));
});

router.get('/about.js', function(req,res){
	res.sendFile(path.join(__dirname + file_path + "aboutuspage/about.js"));
});


router.get('/images/home2Cropped.jpg', function(req, res) {
    res.sendFile(path.join(__dirname + file_path + "images/home2Cropped.jpg"));
});

//Team member profile images
router.get('/images/p1.jpg', function(req, res){
    res.sendFile(path.join(__dirname + file_path + "images/p1.jpg"));
});

module.exports = router;
