var fileHandler = require('../fileHandler.js');

exports.submitProfile = async (req, res) => {
	// console.log(req.body.bio);
	// console.log(req.file);
	// console.log(req.decoded.id);
	let img_dir = req.file.destination + req.file.filename; 

	req.file.buff = fileHandler.img2Base64(img_dir);
	fileHandler.deleteFile(img_dir);
}