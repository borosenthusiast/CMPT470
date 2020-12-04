var router = require('express').Router();
var path = require("path");
var middleware = require('../middleware.js');
var file_path = "/../views/";

router.get('/', function(req, res) {
    console.log('community router', req.originalUrl);
    res.sendFile(path.join(__dirname + file_path + "communitypage/community.html"));
});

router.get('/community.css', function(req, res) {
    res.sendFile(path.join(__dirname + file_path + "communitypage/community.css"));
});

router.get('/community.js', function(req, res) {
    res.sendFile(path.join(__dirname + file_path + "communitypage/community.js"));
});

router.get('/images/home3Cropped.png', function(req, res) {
    res.sendFile(path.join(__dirname + file_path + "images/home3Cropped.png"));
});

module.exports = router;