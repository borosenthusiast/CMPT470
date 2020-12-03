var Profile = require('../models/profile.js');
var User = require("../models/user.js");


/*grab profile pics and usernames (from users)*/
exports.getmatchedusers = async(req,res) => {
	var request = {
		userId: req.decoded.id
	}


	try{
		let matchedusers = await Profile.getmatchedusers(request);


		for (var i = 0; i < matchedusers.length; i++){
			var matcheduser = matchedusers[i];

			let user = await User.getUserbyId(matcheduser.userId);
			matcheduser["username"] = user.username; //append username data
		
		}

		console.log("in server controller: ");
		console.log(matchedusers);

		
		res.send(matchedusers);

		
	} catch (err){
		console.log("Error at matchedusersController.getmatchedusers");
		res.status(500).json({
			error:err,
			message: "load matchedusers to view failed"
		});
	}

}
