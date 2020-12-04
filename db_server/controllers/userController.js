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
		console.log("error");
		res.status(500).send(err); //error statement
	}
};


exports.getUserbyUsername = async (req, res) => {
	try {
		let found_user = await User.getUserbyUsername(req.params.username); 
		res.send(found_user);
	} catch (err) {
		console.log("Error from getUserbyUsername from userController.js");
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

exports.getAllUsers = async (req, res) => {
	try {
		let userlist = await User.getAllUsers();
		res.send(userlist);
	} catch (err) {
		console.log("Error from getAllUsers from userController.js");
		res.status(500).send(err);
	}
}

exports.updateUser = async (req, res) => {
	//console.log(req.body.last_name);
	try {
		let id = req.params.id;
		let update_fields = {
					last_name: req.body.last_name,
					first_name: req.body.first_name,
					username:  req.body.username,
					email: req.body.email
				};
		let update_result = await User.updateUser(id, update_fields);
		if(update_result === 1) {
			res.status(200).json({
				status: "success",
				message: "updated user info"
			});
		} else {
			res.status(200).json({
				status: "failed",
				message: "updated user info"
			});
		}
	} catch (err) {
		res.status(500).send(err);
	}
}