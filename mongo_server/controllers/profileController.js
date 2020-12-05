var Profile = require('../models/profile.js');

exports.addProfile = async(req, res) => {
	let profile = req.body;
	
	let query_result = await Profile.checkProfileExists(profile.userId);
	if(query_result === null) {
		console.log('Profile does not exists can be proceed to add');
		console.log(profile.userId);
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

exports.addPetProfile = async(req, res) => {
	let petProfile = req.body;
	console.log(petProfile.petName);
	let query_result = await Profile.checkProfileExists(petProfile.userId);
	if(query_result === null) {
		console.log("No such profile with userID" + petProfile.userId);
		res.status(200).json({
				success: false,
				message: 'User profile must exists in mongoDB first'
		});
	} else {
		let is_pet_null = await Profile.checkPetProfileNull(petProfile.userId);
		if(is_pet_null) {
			console.log('Pet section is null');
			let result = await Profile.createPetProfile(petProfile);
			console.log(result.modifiedCount);
			if(result.modifiedCount == 1) {
				console.log('Profile created in mongoDB');
				res.status(200).json({
					success: true,
					message: 'Pet Profile added in mongoDB'
				});
			} else {
				console.log('Pet not successfully updated');
				res.status(200).json({
					success: false,
					message: 'Pet Profile was not able to added in mongoDB'
				});
			}
		} else {
			console.log('Pet section is not null');
			console.log('Pet profile already exists in mongoDB');
			res.status(200).json({
				success: false,
				message: 'Pet Profile already exists in mongoDB'
			});
		}
	}
}

exports.getProfileById = async (req, res) => {
	let id = parseInt(req.params.id);
	let query_result = await Profile.getProfileById(id);
	//console.log(query_result);
	if(query_result !== null) {
		res.status(200).json({
			success: true,
			message: 'Profile successfully return',
			data: query_result
		});
	} else {
		res.status(200).json({
			success: false,
			message: 'Profile is null',
			data: query_result
		});
	}
}

exports.updateProfile = async (req, res) => {
	let id = parseInt(req.params.id);
	let update_field = req.body;
	let update_result = await Profile.updateProfile(id, update_field);
	//console.log("here");
	//console.log(update_result);
	if(update_result === 1) {
			res.status(200).json({
				success: true,
				message: 'Profile updated'
			});
	} else {
			res.status(200).json({
				success: false,
				message: 'Profile was not updated'
			});
	}
}