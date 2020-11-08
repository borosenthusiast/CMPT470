var mysql = require("mysql");
var util = require("util");

var connection = mysql.createConnection({
	host: 'localhost',
	port: '3333',
	user: 'root',
	password: 'root',
	database: 'userdb'
});

connection.connect(function(err) {
	if(err) {
		console.log("Not Connected");
	} else {
		console.log("Connected!");
	}
});

connection.query = util.promisify(connection.query);

module.exports = connection;