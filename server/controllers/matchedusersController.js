var Profile = require('../models/profile.js');
var User = require("../models/user.js");
var Message = require("../models/message.js");
var fileHandler = require('../fileHandler.js');


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
		res.send(matchedusers);

		
	} catch (err){
		console.log("Error at matchedusersController.getmatchedusers");
		res.status(500).json({
			error:err,
			message: "load matchedusers to view failed"
		});
	}

}

exports.newmessage = async(req,res) =>{
	console.log("in server users controller");
	console.log(req.body.targetuser);
	console.log(parseInt(req.body.targetuser,10));

	if (req.file !=null){
		let img_dir = req.file.destination + req.file.filename; 
		req.file.buff = fileHandler.img2Base64(img_dir);
		fileHandler.deleteFile(img_dir);	
	}

	const convertedTargetuser = parseInt(req.body.targetuser,10);

	var newmessage = new Message({
		senderId: req.decoded.id,
		targetuser: convertedTargetuser,
		message: req.body.message,
		attachedimg: req.file,
		time: req.body.time,
		//b64img: req.body.b64img
	});

	try {
		let status = await Message.newmessage(newmessage);
		if (status.success){
			res.status(200).json({
				success: true,
				message: 'submit new message success'
			});
		} else {
			res.status(500).json({
				success: false,
				message: 'submit new message failed'
			});

		}

	} catch (err) {
		console.log("Error at matcheduserController.newmessage");

	}


}

exports.loadMessages = async(req,res) =>{
	var ids = {
		senderId: req.decoded.id,
		targetuser: req.body.targetuser
	}
	try {
		let messages = await Message.loadMessages(ids);
		res.send(messages);


	} catch(err) {
		console.log("Error at matchedusersController.loadMessages");
	}
}