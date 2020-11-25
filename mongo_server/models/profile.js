var mongo_db = require("./mongodb.js");

var Profile = function(profile) {
	this.userId = profile.userId;
	this.bio = profile.bio;
	this.profile_img = profile.profile_img;
	this.pet = profile.pet;
}

var PetProfile = function(petProfile) {
	this.petName = petProfile.petName;
	this.age = petProfile.age;
	this.description = petProfile.description;
	this.petImage = petProfile.petImage;
}


Profile.createProfile = async (profile) => {
	try {
		let profile_collection = await mongo_db.mongo_collection('ProfilePage');
		let result = await profile_collection.insertOne(profile);
		return result;
	} catch(err) {
		console.log(err);
		console.log("Error in Profile.createProfile");
	}
}

Profile.checkProfileExists = async (userId) => {
	try {
		let profile_collection = await mongo_db.mongo_collection('ProfilePage');
		let query = {userId: userId};
		let projection = {_id: 1, userId: 1};
		let result = await profile_collection.findOne(query, projection);
		return result;
	} catch (err) {
		console.log(err);
		console.log("Error in Profile.checkProfileExists");
	}
}

Profile.createPetProfile = async (petProfile) => {
	try {
		let pet_profile = new PetProfile(petProfile);
		let userId = petProfile.userId;
		let profile_collection = await mongo_db.mongo_collection('ProfilePage');
		let query = {userId: petProfile.userId};
		let newValue = {$set: {pet: pet_profile}};
		let result = await profile_collection.updateOne(query, newValue);
		return result;
	} catch (err) {
		console.log(err);
		console.log("Error in Profile.createPetProfile");
	}
}

Profile.checkPetProfileNull = async (userId) => {
	try {
		let profile_collection = await mongo_db.mongo_collection('ProfilePage');
		let query = {userId: userId};
		let projection = {_id: 1, userId: 1, pet:1};
		let result = await profile_collection.findOne(query, projection);
		if(result.pet === null) {
			return true;
		} else {
			return false;
		}
	} catch (err) {
		console.log(err);
		console.log("Error in Profile.checkProfileExists");
	}
}

module.exports = Profile;