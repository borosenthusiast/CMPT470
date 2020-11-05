var http = require('http');
var querystring = require('querystring');

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

	console.log(user);

	var output = "";

	var request = http.request(options, (res) => {
		res.setEncoding('utf8');

		res.on('data', (chunk) => {
			output += chunk
    		console.log(`BODY: ${chunk}`);
  		});

  		res.on('end', () => {
   		 console.log('No more data in response.');
  		});

	});

	request.write(JSON.stringify(user));
	request.end();

	return output;
}



module.exports = User;