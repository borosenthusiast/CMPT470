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

exports.getTenRandomProfiles = async(req,res) => {
	var userid = req.body.userId;
	let result = await Profile.gettenrandomprofiles(userid);
	if (result === undefined || result.length == 0){
		res.status(500).json({
			success:false,
			message: 'getTenRandomProfiles was not able to grab random profiles from mongoDB'
		});
	} else {
		res.send(result);
	}

}

exports.checkifmatch = async(req, res) => {
	let isMatch = await Profile.checkifmatch(req.body);
	if (isMatch === null){
		res.status(500).json({
			success:false,
			message: 'unable to check if match by mongoDB'
		});
	} else {
		res.send(isMatch);
	}
	

}

exports.pushtoaddedlist = async(req, res) =>{
	let pushToCurrent = await Profile.pushToCurrentUser(req.body);
	if (pushToCurrent == true){
		res.status(200).json({
			success: true,
			message: 'pushed addedId to addedlist'
		});
	} 
	
	else {
		res.status(500).json({
			success:false,
			message: 'unable to push addedUser to currentUser'
		});

	}
}

exports.chosenIdpriority = async(req, res) => {
	let state = await Profile.prioritizeChosenId(req.body);
	if (state === null){
		res.status(500).json({
			success:false,
			message: 'unable to prioritize chosenID'
		});		
	} else {
		res.status(200).json({
			success: true,
			message: 'prioritized chosenID'
		});

	}


}

exports.getmatchedusers = async(req, res) => {
	var request = {
		userId: req.body.userId	
	}
	let matchedusers = await Profile.getmatchedusers(request);
	if (matchedusers === null){
		res.status(500).json({
			success:false,
			message: 'unable to get matchedusers'
		});		
	} else {
		res.send(matchedusers);
	}

}
