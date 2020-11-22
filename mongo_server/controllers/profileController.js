var Profile = require('../models/profile.js');

exports.addProfile = async(req, res) => {
	let profile = req.body;
	
	let query_result = await Profile.checkProfileExists(profile.userId);
	if(query_result === null) {
		console.log('Profile does not exists can be proceed to add');
		let result = await Profile.createProfile(profile);
		console.log(result.insertedId);
		if(result.insertedId) {
			console.log('Profile created in mongoDB');
			res.status(200).json({
				success: true,
				message: 'Profile created in mongoDB'
			});
		} else {
			res.status(500).json({
				success: false,
				message: 'Profile was not able to added in mongoDB'
			});
		}
	} else {
		console.log('Profile already exists in mongoDB');
		res.status(500).json({
			success: false,
			message: 'Profile already exists in mongoDB'
		});
	}
}