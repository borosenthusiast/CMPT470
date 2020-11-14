var express = require('express');
var router = express.Router();
var path = require('path');
var file_path = "/../views/";
var userController = require('../controllers/userController');
var db=require('../../db_server/models/userDB.js');

router.get('/', function(req, res, next) {
    var sql='SELECT * FROM user';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('userlistpage/userlist', { title: 'User List', userData: data});
  });
});

router.get('/userlist.css', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "userlistpage/userlist.css"));
});

router.get('/userlist.js', function(req,res) {
	res.sendFile(path.join(__dirname + file_path + "userlistpage/userlist.js"));
});


module.exports = router;