var mongo = require('mongodb').MongoClient;
var util = require("util");

var url = "mongodb://localhost:27017";

// var mongo_connection = mongo.connect(url, {useUnifiedTopology: true}, (err, client) => {
// 	try {
// 		console.log("Mongodb connected");
// 		return client;
// 	} catch(err) {
// 	console.log(err);
// 	console.log("Unable to Connect to mongodb");
// 	}
// });

//mongo_db = mongo;

exports.mongo_collection = async (collection_name) => {
	var mongo_connection, db;

	try {
		 mongo_connection = await mongo.connect(url, {useUnifiedTopology: true});
		 db = mongo_connection.db('Matchpaw').collection(collection_name);
		 return db;
	} catch(err) {
		console.log(err);
	}
}

//module.exports = mongo_connection;
