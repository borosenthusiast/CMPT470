var User = require("../models/user.js");

exports.signUp = async (req, res) => {
	var user = new User({username:   req.body.username, 
						 password:   req.body.password,
						 first_name: req.body.first_name,
						 last_name:  req.body.last_name,
						 email:      req.body.email,
						 account_type: req.body.account_type
						});

	try {
		let isUsernameAvailable = await User.isUsernameAvailable(user);
		let isEmailAvailable = await User.isEmailAvailable(user);
		if(isUsernameAvailable && isEmailAvailable) {
			console.log("Username available");
			let id = await User.create(user);
			//delete later
			console.log("User module")
			res.send("User created with id: " + id);
		} else {
			res.send("Username or email already exists"); //
		}
	} catch (err) {
		console.log(err);
		res.status(500).send(err); //error statement
	}
};


exports.getUserbyUsername = async (req, res) => {
	try {
		let found_user = await User.getUserbyUsername(req.params.username); 
		res.send(found_user);
	} catch (err) {
		console.log("Error from getUserbyUsername from userController.js");
		console.log(err);
		res.status(500).send(err);
	}
};

exports.getUserbyId = async (req, res) => {
	try {
		let found_user = await User.getUserbyId(req.params.id); 
		res.send(found_user);
	} catch (err) {

	}
}