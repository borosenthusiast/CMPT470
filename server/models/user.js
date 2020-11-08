var http = require('http');
var querystring = require('querystring');
var util = require("util");
var axios = require("axios");

var User = function(user) {
	this.username = user.username;
	this.password = user.password;
}

User.create = async(user) => {
	var options = {
		host: 'localhost',
		port: 8080,
		path: '/users/signup',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	}


	var output = "";
	//http.request = util.promisify(http.request);

	// var request =  await http.request(options, (res) => { // create this into a helper function
	// 	res.setEncoding('utf8');

	// 	res.on('data', (chunk) => {
	// 		output += chunk
 //    		console.log(`BODY: ${chunk}`);
 //  		});

 //  		res.on('end', () => {
 //   		 console.log('No more data in response.');
 //  		});

	// });

	// request.write(JSON.stringify(user));
	// request.end();

	response = await axios.post('http://localhost:8080/users/signup', user);
	//console.log(response.data);
	return response.data;
}



module.exports = User;