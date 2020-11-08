var User = require("../models/user.js");

exports.signUp = async (req, res) => {
	var user = new User({username: req.body.username, password: req.body.password});

	try {
		let isUsernameAvailable = await User.isUsernameAvailable(user);
		if(isUsernameAvailable) {
			console.log("Username available");
			let id = await User.create(user);
			//delete later
			console.log("User module")
			res.send("User created with id: " + id);
		} else {
			res.send("Username already exists");
		}
	} catch (err) {
		console.log("error");
		res.status(500).send(err); //error statement
	}
};


exports.getUserbyUsername = async (req, res) => {
	try {
		let found_user = await User.getUserbyUsername(req.params.username); 
		res.send(found_user);
	} catch (err) {
		console.log("error");
		res.status(500).send(err);
	}
};
