var user_db = require("./userDB.js");

var User = function(user) {
	//type check later
	this.username = user.username;
	this.password = user.password;
}

User.isUsernameAvailable = async(user) => {
	//return boolean whether the username is used or not.
	//var query_result = null;
	let query = await user_db.query("SELECT username FROM user WHERE username = ?", [user.username]);
	console.log(user);
	if(query.length > 0) {
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