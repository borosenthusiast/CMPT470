var mongo = require('mongodb').MongoClient;
var util = require("util");

var url = "mongodb://localhost:27017/Matchpaw";

mongo.connect(url).then(function (db) {
	console.log("Mongodb connected");
}).catch(function (err) {
	console.log("Unable to Connect to mongodb");
});

module.exports = mongo;
