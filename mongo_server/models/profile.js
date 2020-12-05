var mongo_db = require("./mongodb.js");

var Profile = function(profile) {
	this.userId = profile.userId;
	this.bio = profile.bio;
	this.profile_img = profile.profile_img;
	this.pet = profile.pet;

	this.addedlist = profile.addedlist;
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

Profile.gettenrandomprofiles = async (userid) => {
	console.log(userid);
	var currentuser = userid;
	try{
		let profile_collection = await mongo_db.mongo_collection('ProfilePage');
		/*grab max 10 random users from db*/
		let query = [
						{	$match: {userId: { $not: { $eq: currentuser }}} },
						{	$sample: {size: 10}	},
						{	$project: {userId: 1, profile_img: 1}	}
					];
		let result = await profile_collection.aggregate(query).toArray();
		return result;

	} catch(err){
		console.log(err);
		console.log("error in Profile.gettenrandomprofiles");
	}

}

Profile.checkifmatch = async (ids) =>{
	var userid = ids.userId;
	var addedid = parseInt(ids.addedId, 10);

	try{
		let profile_collection = await mongo_db.mongo_collection('ProfilePage');

		let addedUserQuery = {userId: addedid};
		let projection = {userId: 1, addedlist:1 };
		
		let addedUserResult = await profile_collection.findOne(addedUserQuery, projection);

		if (addedUserResult.addedlist.includes(userid) == true){
			//is a match
			return true;
		} else {
			return false;
		}

 
	}
	 catch (err) {
		console.log(err);
		console.log("Error in Profile.checkAddedlistExists");
	}


}

Profile.pushToCurrentUser = async(ids) => {
	var status = false;

	var userid = ids.userId;
	var addedid = parseInt(ids.addedId, 10);

	try {
		let profile_collection = await mongo_db.mongo_collection('ProfilePage');

		let query = {userId: userid};
		let projection = {userId: 1, addedlist:1 };
		let result = await profile_collection.findOne(query, projection);

		//console.log("result here: ");
		//console.log(result.addedlist.length);
		
		if (result.addedlist[0] === null && result.addedlist.length == 1){
			let query = {userId:userid};
			let update = { $set: {"addedlist.0":addedid} }; //insert addedid to index:0
			let projection = {userId:1, addedlist:1};
		
			let initresult = await profile_collection.updateOne(query, update, projection);
			//console.log("set result: ");
			//console.log(initresult.addedlist);

			status = true;
			
		} else {
			//check if already in array
			if (result.addedlist.includes(addedid) == false){
				//push to addedlist
				let query = {userId: userid};
				let update = { $push: {addedlist: addedid} };
				let projection = {userId:1, addedlist:1};

				let pushresult = await profile_collection.updateOne(query, update, projection);
			}

			status = true;
		}
		
		return status;
	
	} catch (err) {
		console.log(err);
		console.log("Error in Profile.checkAddedlistExists");
	}
}


Profile.getaddedlist = async(request) => {
	var userid = request.userId;
	try{
		let profile_collection = await mongo_db.mongo_collection('ProfilePage');
		let query = [
						{	$match: {userId: { $eq: userid }} },
						{	$project: {userId: 1, addedlist: 1}	}
					];
		
		let result = await profile_collection.aggregate(query).toArray();
		//console.log(result[0].addedlist);
		return result[0].addedlist;

	}
	 catch (err) {
		console.log(err);
		console.log("Error in Profile.checkAddedlistExists");
	}

}

 Profile.getmatchedusers = async (request) => {
 	var userid = request.userId;
 	//console.log("currentuser: " + userid);
 	//var addedlist = request.addedList;

	try{
		let profile_collection = await mongo_db.mongo_collection('ProfilePage');
		let query = [
						{	$match: {
								userId: {$not: { $eq: userid }},
								addedlist: { $in: [userid] } 
							} 
						},
						{	
							$project: { 
								userId: 1, 
								profile_img: 1,
								addedlist: 1
							}	
						}
					];
		
		let result = await profile_collection.aggregate(query).toArray();
	
		//console.log("query result");
		//console.log(result);

		return result;

	}
	 catch (err) {
		console.log(err);
		console.log("Error in Profile.checkAddedlistExists");
	}

 };

module.exports = Profile;