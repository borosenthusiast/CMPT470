var axios = require("axios");

var Profile = function(profile) {
	this.userId = profile.userId;
	this.bio = profile.bio;
	this.profile_img = profile.profile_img;
	this.pet = profile.pet;
	
	this.addedlist = [Number];
}


Profile.create = async (profile) => {
	let response = await axios.post('http://localhost:8081/profile/createprofile', profile);
	console.log(response.data);
	return response.data;
}

Profile.getProfileById = async (id) => {
	let response = await axios.get('http://localhost:8081/profile/getprofilebyid/' + id);
	return response.data;
}

Profile.updateProfile = async (id, data) => {
	let response = await axios.post('http://localhost:8081/profile/updateprofile/' + id, data);
	return response.data;
}

Profile.getTenRandom = async (profile)=>{
	let response = await axios.post('http://localhost:8081/profile/tenrandomprofiles', profile);
	/*response.data is random users in array*/
	return response.data;
}

Profile.pushtoaddedlist = async (ids) => {
	//console.log("in server profile model: ");
	//console.log(addedId);
	let response = await axios.post('http://localhost:8081/profile/pushtoaddedlist', ids);
	return response.data;
}

Profile.checkifmatch = async (ids) => {
	let response = await axios.post('http://localhost:8081/profile/checkifmatch', ids);
	//console.log("in server model verifying: ");
	//console.log(response.data);
	return response.data;
}

Profile.getmatchedusers = async(userid) => {
	let response = await axios.post('http://localhost:8081/profile/getmatchedusers', userid);
	return response.data;
}

module.exports = Profile;