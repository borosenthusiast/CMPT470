var fileHandler = require('../fileHandler.js');
var Profile = require('../models/profile.js');

exports.submitProfile = async (req, res) => {
	// console.log(req.body.bio);
	// console.log(req.file);
	// console.log(req.decoded.id);
	let img_dir = req.file.destination + req.file.filename; 
	req.file.buff = fileHandler.img2Base64(img_dir);
	fileHandler.deleteFile(img_dir);

	var profile = new Profile({
		userId: req.decoded.id,
		bio: req.body.bio,
		profile_img:  req.file,
		pet: null
	});

	try {
		let status = await Profile.create(profile);
		if(status.success) {
			console.log('Profile created');
			res.status(200).json({
				success: true,
				message: 'Profile creation success'
			});
		} else {
			console.log('Profile not created');
			res.status(500).json({
				success: false,
				message: 'Profile creation failed'
			});
		}
	} catch (err) {
		console.log("Error at profileController.submitProfile");
		res.status(500).json({
			error:err,
			message: "Profile creation failed"
		});
	}
}

exports.getProfileById = async (req, res) => {
	try {
		let status = await Profile.getProfileById(req.params.id);
		if(status.success) {
			console.log('Profile found');
			res.status(200).json({
				success: true,
				message: 'Profile found',
				data: status.data
			});
		} else {
			console.log('Profile not found');
			res.status(500).json({
				success: false,
				message: 'Profile not found',
				data: status.data
			});
		}
	} catch (err) {
		console.log("Error at profileController.getProfileById");
		res.status(500).json({
			error:err,
			message: "Profile search failed"
		});
	}
}
