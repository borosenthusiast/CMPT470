var User = require("../models/user.js");

exports.signUp = async (req, res) => {
	var user = new User({username: req.body.username, password: req.body.password});

	try {
		let id = await User.create(user); //id is currently undefined edit later
		res.send(id);
	} catch (err) {
		console.log("error");
		res.status(500).send(err);
	}
};