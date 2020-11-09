var mongo_db = require("./mongodb.js");

var Profile = function(profile) {
	this.username = profile.username;
	this.bio = profile.bio;
	this.userImage = profile.userImage;
	this.petname = profile.petname;
	this.petage = profile.petage;
	this.petDescription = profile.petDescription;
	this.petImage = profile.petImage;
}