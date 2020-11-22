var fileHandler = require('../fileHandler.js');
var Profile = require('../models/petProfile.js');

exports.submitPetProfile = async (req, res) => {
	// console.log(req.body.bio);
	// console.log(req.file);
	// console.log(req.decoded.id);
	let img_dir = req.file.destination + req.file.filename; 
	req.file.buff = fileHandler.img2Base64(img_dir);
	fileHandler.deleteFile(img_dir);

	var petProfile = new PetProfile({
		userId: req.decoded.id,
		petName: req.body.petName,
		age: req.body.age,
		description: req.body.description,
		petImage:  req.file
	});

	try {
		let status = await PetProfile.create(petProfile);
		if(status.success) {
			console.log('Pet Profile created');
			res.status(200).json({
				success: true,
				message: 'Pet Profile creation success'
			});
		} else {
			console.log('Pet Profile not created');
			res.status(500).json({
				success: false,
				message: 'Pet Profile creation failed'
			});
		}
	} catch (err) {
		console.log("Error at petProfileController.submitProfile");
		res.status(500).json({
			error:err,
			message: "Pet profile creation failed"
		});
	}
}
