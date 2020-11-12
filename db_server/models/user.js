var user_db = require("./userDB.js");

const account_type = {
	ADMIN: 'Admin',
	ADOPT: 'Adopt',
	USER: 'User'
};

var User = function(user) {
	//type check later
	this.username = user.username;
	this.password = user.password;
	this.first_name = user.first_name;
	this.last_name = user.last_name;
	this.email = user.email;
	this.account_type = user.account_type;
}

User.isUsernameAvailable = async(user) => {
	//return boolean whether the username is used or not.
	//var query_result = null;
	let query = await user_db.query("SELECT username FROM user WHERE username = ?", [user.username]);
	//console.log(user);
	if(query.length > 0) {
		console.log("Username already exists");
		return false;
	} else {
		return true;
	}
}

User.isEmailAvailable = async(user) => {
	//return boolean whether the username is used or not.
	//var query_result = null;
	let query = await user_db.query("SELECT email FROM user WHERE email = ?", [user.email]);
	//console.log(user);
	if(query.length > 0) {
		console.log("Email already exists");
		return false;
	} else {
		return true;
	}
}

User.getUserbyUsername = async(username) => {
	let query = await user_db.query("SELECT username, password FROM user WHERE username = ?", [username]);
	//console.log(query[0]);
	return query[0];
}

User.create = async(user) => {
	let result = await user_db.query("INSERT INTO user SET ?", [user]); //add something to prevent sql injection
	if(result.insertId) {
		console.log("User created")
		return result.insertId;
	} else {
		return;
	}	
}

module.exports = User;