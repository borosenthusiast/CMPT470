var axios = require("axios");
var config = require("../config.js");

var PetProfile = function(petProfile) {
	this.userId = petProfile.userId;
	this.petName = petProfile.petName;
	this.age = petProfile.age;
	this.description = petProfile.description;
	this.petImage = petProfile.petImage;
}


PetProfile.create = async (petProfile) => {
	let response = await axios.post(config.addr_mongo + '/profile/createpetprofile', petProfile);
	console.log(response.data);
	return response.data;
}

module.exports = PetProfile;