var User = require("../models/user.js");

exports.signUp = async (req, res) => {
	var user = new User({username: req.body.username, password: req.body.password});

	try {
		let id = await User.create(user);
		//delete later
		console.log("User module")
		res.send("User created with id: " + id);
	} catch (err) {
		res.status(500).send(err); //error statement
	}
};