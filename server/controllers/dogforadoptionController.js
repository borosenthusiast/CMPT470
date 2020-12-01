var Dogforadoption = require('../models/dogforadoption.js');

exports.getAlldogs = async (req,res) =>{
	console.log("dogforadoptionController.getAlldogs visited!");
}

exports.submitDogforadoption = async (req, res) => {	
	var dogforadoption = new Dogforadoption ({
		name: req.body.name,
		age: req.body.age,
		monthyear: req.body.monthyear,
		gender: req.body.gender,
		breed: req.body.breed,
		description: req.body.description,
		dogimgs: req.files,
		agencyName: req.body.agencyName,
		location: req.body.location,
		website: req.body.website,
		tel: req.body.tel


	});

	try {
		let status = await Dogforadoption.create(dogforadoption);

		if(status.success) {
			console.log('dogforadoption created');
			res.status(200).json({
				success: true,
				message: 'dogforadoption creation success'
			});
		} else {
			console.log('dogforadoption not created');
			res.status(500).json({
				success: false,
				message: 'dogforadoption creation failed'
			});
		}
	} catch (err) {
		console.log("Error at dogforadoptionController.submitDogforadoption");

	}

}