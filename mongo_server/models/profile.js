var mongo_db = require("./mongodb.js");

var Profile = function(profile) {
	this.userId = profile.userId;
	this.bio = profile.bio;
	this.profile_img = profile.profile_img;
	this.pet = profile.pet;
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

module.exports = Profile;