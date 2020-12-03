var Profile = require('../models/profile.js');
var User = require("../models/user.js");

/*onClick send message button*/
exports.chosenIdpriority = async(req,res) => {
	console.log("in cardflipController");
	var request = {
		userId: req.decoded.id,
		chosenId: req.body.chosenId
	};
	try{
		let status = await Profile.chosenIdpriority(request);

		if(status.success) {
			res.status(200).json({
				success: true,
				message: 'prioritizing chosenId success'
			});
		} else {
			res.status(500).json({
				success: false,
				message: 'prioritizing chosenId failed'
			});
		}

		
	} catch (err){
		console.log("Error at cardflipController.chosenIdpriority");
		res.status(500).json({
			error:err,
			message: "prioritizing chosenId failed"
		});
	}
	


}

exports.checkifmatch = async(req, res)=>{
	//console.log("in checkifmatch: ");
	//console.log(req.body); //req body empty on get requests
	var request = {
		userId: req.decoded.id,
		addedId: req.body.addedId
	};
	try{
		let checkData = await Profile.checkifmatch(request);

		res.send(checkData);
		
	} catch (err){
		console.log("Error at cardflipController.checkifmatch");
		res.status(500).json({
			error:err,
			message: "checking match failed"
		});
	}


}

exports.pushtoaddedlist = async(req,res) =>{
	var request = {
		userId: req.decoded.id,
		addedId: req.body.addedId
	};

	//console.log(req.decoded.id);
	//console.log(req.body);
	try{
		let status = await Profile.pushtoaddedlist(request);
		if(status.success) {
			console.log('pushed addedId to addedlist in profile');
			res.status(200).json({
				success: true,
				message: 'pushing to addedlist success'
			});
		} else {
			console.log('addedId not pushed to addedlist in profile');
			res.status(500).json({
				success: false,
				message: 'pushing to addedlist failed'
			});
		}
	} catch (err){
		console.log("Error at cardflipController.pushtoaddedlist");
		res.status(500).json({
			error:err,
			message: "pushing addedId to list failed"
		});
	}
}

exports.getcards = async (req, res) => {
	/*input to get cards except for current user*/
	var profile = new Profile({
		userId: req.decoded.id,
		bio: req.body.bio,
		profile_img:  req.file,
		pet: null
	});
	

	//get 10 random cards excluding current user
	try{
		let randomcards = await Profile.getTenRandom(profile);
		for (var i = 0; i < randomcards.length; i++){
			var a_card = randomcards[i];

			let user = await User.getUserbyId(a_card.userId);
			a_card["username"] = user.username;
			console.log("userid: " + a_card.userId);
			console.log("username: " + a_card.username);
		}

		res.send(randomcards);
		
	} catch (err){
		console.log("Error at cardflipController.getcards");
		res.status(500).json({
			error:err,
			message: "random card draw failed"
		});
	}
}



