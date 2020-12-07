var http = require('http');
var querystring = require('querystring');
var util = require("util");
var axios = require("axios");
var config = require("../config.js");

var User = function(user) {
	this.username = user.username;
	this.password = user.password;
	this.first_name = user.first_name;
	this.last_name = user.last_name;
	this.email = user.email;
	this.account_type = user.account_type;
}

User.create = async(user) => {	
	let response = await axios.post(config.addr_mysql + '/users/signup', user);
	//console.log(response.data);
	return response.data;
}

User.getUserbyUsername = async(username) => {
	let response = await axios.get(config.addr_mysql + '/users/getusersbyusername/' + username);
	console.log("User.getusersbyusername" + response.data);
	return response.data;
};

User.getUserbyId = async(id) => {
	let response = await axios.get(config.addr_mysql + '/users/getusersbyid/' + id);
	return response.data;
}

User.getAllUsers = async() => {
	let response = await axios.get(config.addr_mysql + '/users/getallusers');
	return response.data;
}

User.updateUser = async(id, data) => {
	let response = await axios.post(config.addr_mysql + '/users/updateuser/' + id, data);
	return response.data;
}	

module.exports = User;