var Profile = require('../models/profile.js');

exports.addProfile = async(req, res) => {
	let profile = req.body;
	let result = await Profile.createProfile(profile);

	console.log(result);

	res.status(200).json({
			success: true,
			message: 'Profile created'
	});
}