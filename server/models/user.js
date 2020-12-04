var http = require('http');
var querystring = require('querystring');
var util = require("util");
var axios = require("axios");

var User = function(user) {
	this.username = user.username;
	this.password = user.password;
	this.first_name = user.first_name;
	this.last_name = user.last_name;
	this.email = user.email;
	this.account_type = user.account_type;
}

User.create = async(user) => {	
	let response = await axios.post('http://localhost:8080/users/signup', user);
	//console.log(response.data);
	return response.data;
}

User.getUserbyUsername = async(username) => {
	let response = await axios.get('http://localhost:8080/users/getusersbyusername/' + username);
	console.log("User.getusersbyusername" + response.data);
	return response.data;
};

User.getUserbyId = async(id) => {
	let response = await axios.get('http://localhost:8080/users/getusersbyid/' + id);
	//console.log(response.data);
	return response.data
}


module.exports = User;