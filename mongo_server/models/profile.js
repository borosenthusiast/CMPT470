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

Profile.getProfileById = async (userId) => {
	try {
		//console.log(typeof userId);
		let profile_collection = await mongo_db.mongo_collection('ProfilePage');
		let query = {userId: userId};
		//let projection = {_id: 1, userId: 1, pet:1};
		let result = await profile_collection.findOne(query);
		return result;
	} catch (err) {
		console.log(err);
	}
}

Profile.updateProfile = async (id, data) => {
	try {
		let profile_collection = await mongo_db.mongo_collection('ProfilePage');
		let filter = {userId: id};
		let options = {upsert: false};
		
		updateFields = {
						bio: data.bio,
						"pet.petName": data.pet_name,
						"pet.age": data.pet_age,
					    "pet.description": data.pet_description,
						
		}
		

		if(data.files !== null) {
				for(var key in data.files) {
					console.log(key);
					if(key === 'profile_img') {
						updateFields.profile_img = data.files[key];
					}

					if(key === 'pet_img') {
						console.log(data.files[key]);
						updateFields["pet.petImage"] = data.files[key];
					}
				}	
		} 

		let updateDoc = {
			$set: updateFields
		}

		//updateDoc

		let result = await profile_collection.updateOne(filter, updateDoc, options);
		return result.modifiedCount;
	} catch (err) {
		console.log(err);
	}
}

module.exports = Profile;