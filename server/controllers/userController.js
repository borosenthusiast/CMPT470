var User = require("../models/user.js");
let jwt = require('jsonwebtoken');
let config = require('../config.js');


exports.signUp = async (req, res) => {
	var user = new User({username: req.body.username, password: req.body.password});

	try {
		let id = await User.create(user); //id is currently undefined edit later
		res.status(200).json({
			success: true,
			message: 'User Creation Success'
		});
		return;
	} catch (err) {
		console.log("error");
		res.status(500).json({
			error: err,
			message: "user creation failed."
		});
		//return;
	}
};

exports.logIn = async (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	try {
		let user = await User.getUserbyUsername(username);
		console.log("User matched from DB: " + JSON.stringify(user));
		if(username && password) {
			if(username === user.username && password === user.password) {
				console.log("Test login success!");
				let token = jwt.sign({username: username},
                    config.secret, {
                        expiresIn: '1h'
                    }
                );
                
                res.status(200).json({
                    success: true,
                    message: 'Authentication Success',
                    token: token
                });
               
                return;
                
			} else {
                res.status(403).json({
                    success: false,
                    message: 'Incorrect Login Username or Password.'
                });
                return;
            }
		} else {
            res.status(400).json({
                success: false,
                message: 'Authentication Failed - Incorrect Request'
            })
            return;
        }

		//console.log(user);
	} catch (err) {
		console.log("error");
		res.status(500).send(err);
		//return;
	}
};