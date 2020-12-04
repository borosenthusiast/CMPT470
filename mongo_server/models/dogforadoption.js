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
	this.tel = doginfo.tel,
	this.time = doginfo.time
}

Dogforadoption.createDogforadoption = async (doginfo) => {


	try {
		let dogforadoption_collection = await mongo_db.mongo_collection('DogForAdoption');
		let count = await dogforadoption_collection.count();

		let result = await dogforadoption_collection.insertOne( 
						{
							name: doginfo.name, 
							age: doginfo.age,
							monthyear: doginfo.monthyear,
							gender: doginfo.gender,
							breed: doginfo.breed,
							description: doginfo.description,
							dogimgs: doginfo.dogimgs,
							agencyName: doginfo.agencyName,
							location: doginfo.location,
							website: doginfo.website,
							tel: doginfo.tel,
							time: doginfo.time,

							id: count

						}
		)

	

		return result;
	} catch(err) {
		console.log(err);
		console.log("Error in DogForAdoption.createDogforadoption");
	}
}

Dogforadoption.getAlldogs = async () =>{
	try{
		let dogforadoption_collection = await mongo_db.mongo_collection('DogForAdoption');
		let result = await dogforadoption_collection.find().toArray();

		return result;
	} catch(err) {
		console.log(err);
		console.log("Error in Dogforadoption.getAlldogs");
	}
}

Dogforadoption.loadDog = async (dogrequest)=>{
	var converted_dogid = parseInt(dogrequest.dogid);

	try{
		let dogforadoption_collection = await mongo_db.mongo_collection('DogForAdoption');
		let result = await dogforadoption_collection.findOne({id: converted_dogid});
		console.log(result);
		return result;
	} catch(err) {
		console.log(err);
		console.log("Error in Dogforadoption.getAlldogs");
	}

}

module.exports = Dogforadoption;