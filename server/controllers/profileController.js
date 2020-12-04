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
			res.status(200).json({
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

exports.updateProfile = async (req, res) => {
	try {
		if(Object.keys(req.files).length === 0) {
			req.files = null;
		} else {
			console.log("image exists")
			//console.log(req.files.pet_img[0]);
			for(var key in req.files) {
				req.files[key] = req.files[key][0];
				let img_dir = req.files[key].destination + req.files[key].filename; 
				req.files[key].buff = fileHandler.img2Base64(img_dir);
				fileHandler.deleteFile(img_dir);
				//console.log(req.files[key]);
			}
		}
		console.log(req.body);
		let id = req.params.id;
		let update_fields = {
								bio: req.body.bio, 
								pet_name: req.body.pet_name,
								pet_age: req.body.pet_age,
								pet_description: req.body.pet_description,
								files: req.files
							};
		let status = await Profile.updateProfile(id, update_fields);

		console.log(status);
		if(status.success) {
				res.status(200).json({
						success: true,
						message: 'Profile updated',
				});
		} else {
			res.status(200).json({
				success: false,
				message: 'Profile found',
			});
		}
	} catch (err) {
		console.log("Error at profileController.updateProfile");
		console.log(err);
		res.status(500).json({
			error:err,
			message: "Profile updated failed"
		});
	}
}
