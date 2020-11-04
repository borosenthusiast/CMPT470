var user_db = require("./userDB.js");

var User = function(user) {
	//type check later
	this.username = user.username;
	this.password = user.password;
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