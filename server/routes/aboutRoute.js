var router = require('express').Router();
var path = require("path");
var middleware = require('../middleware.js');
var file_path = "/../views/";

router.get('/', function(req, res) {
    console.log("about us router", req.originalUrl);
    res.sendFile(path.join(__dirname + file_path + "aboutuspage/about.html"));
});

router.get('/about.css', function(req, res) {
    res.sendFile(path.join(__dirname + file_path + "aboutuspage/about.css"));
});

router.get('/images/home2Cropped.jpg', function(req, res) {
    res.sendFile(path.join(__dirname + file_path + "images/home2Cropped.jpg"));
});

module.exports = router;