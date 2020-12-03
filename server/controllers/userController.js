var User = require("../models/user.js");
let jwt = require('jsonwebtoken');
let config = require('../config.js');

const account_type = {
	ADMIN: 'Admin',
	ADOPT: 'Adopt',
	USER: 'User'
};

exports.signUp = async (req, res) => {
	var type_account = "";
	if(req.body.account_type === "dog_owner") {
		type_account = account_type.USER;
	}

	if(req.body.account_type === "adoption_agency") {
		type_account = account_type.ADOPT;
	}
	var user = new User({username:   req.body.username, 
						 password:   req.body.password,
						 first_name: req.body.first_name,
						 last_name:  req.body.last_name,
						 email:      req.body.email,
						 account_type: type_account
						});

	try {
		let id = await User.create(user); 
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

exports.getAllUsers = async(req, res) => {
	try {
		let userList = await User.getAllUsers();
		res.status(200).send({
			status: "success",
			message: "Successfully got all the users",
			data: userList
		});
	} catch (err) {
		res.status(500).send({
			error:err,
			message: "Failed to get all users"
		});
	}
}

exports.logout = async(req, res) => {
	//Instruct the clientside to delete the token on success, as to invalidate their current session and require logging in again.
	try {
		res.status(200).send({
			status: "success",
			redirect: "/"
		});
	}
	catch (err) {
		res.status(500).send({
			error: err,
			message: "Failed user logout."
		});
	}
}

exports.logIn = async (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	try {
		let user = await User.getUserbyUsername(username);
		console.log("User matched from DB: " + JSON.stringify(user));
		if(username && password) {
			if(username === user.username && password === user.password) {
				console.log("Login success!");
				let token = jwt.sign({id: user.id},
                    config.secret, {
                        expiresIn: '2h'
                    }
                );
                //console.log(jwt.verify(token, config.secret));
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

	} catch (err) {
		console.log("error");
		res.status(500).send(err);
		//return;
	}
};

exports.getUserById = async (req, res) => {
	try {
		id = req.params.id;
		let user = await User.getUserbyId(id);
		if(user) {
			res.status(200).json({
				status: "success",
				message: "Successfully got the users",
				data: user
			});
		} else {
			res.status(200).json({
				status: "failed",
				message: "Failed to get user information"
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
}