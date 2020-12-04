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
		pet: null,
		
		addedlist: [Number],
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
