var mongo_db = require("./mongodb.js");

var Dogforadoption = function(doginfo) {
	this.name = doginfo.name,
	this.age = doginfo.age,
	this.monthyear = doginfo.monthyear,
	this.gender = doginfo.gender,
	this.breed = doginfo.breed,
	this.description = doginfo.description,
	this.dogimgs = doginfo.dogimgs,
	this.agencyName = doginfo.agencyName,
	this.location = doginfo.location,
	this.website = doginfo.website,
	this.tel = doginfo.tel
}

Dogforadoption.createDogforadoption = async (doginfo) => {
	try {
		let dogforadoption_collection = await mongo_db.mongo_collection('DogForAdoption');
		let result = await dogforadoption_collection.insertOne(doginfo);
		return result;
	} catch(err) {
		console.log(err);
		console.log("Error in DogForAdoption.createDogforadoption");
	}
}

module.exports = Dogforadoption;