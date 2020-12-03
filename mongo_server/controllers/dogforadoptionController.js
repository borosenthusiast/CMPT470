var Dogforadoption = require('../models/dogforadoption.js');

exports.addDogforadoption = async(req, res) => {
	var doginfo = req.body;
	console.log(doginfo);

	//no need to check for duplicates

	let result = await Dogforadoption.createDogforadoption(doginfo);

	if(result.insertedId) {
			res.status(200).json({
				success: true,
				message: 'dogforadoption created in mongoDB'
			});
	} else {
			res.status(500).json({
				success: false,
				message: 'dogforadoption was not able to added in mongoDB'
			});
	}
}