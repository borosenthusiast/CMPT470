var Message = require('../models/message.js');

exports.addnewmessage = async(req, res) => {
	var messageData = req.body;

	/*console.log(messageData.senderId);
	console.log(messageData.targetuser);
	console.log(messageData.message);
	console.log(messageData.attachedimg);*/

	let result = await Message.addnewmessage(messageData);


	if (result.insertedId != null){
		res.status(200).json({
			success: true,
			message: 'new message added to mongoDB'
		});
	} else {
		res.status(500).json({
			success: false,
			message: 'failed to add new message to mongoDB'
		});

	}

}

exports.loadMessages = async(req,res) =>{
	var ids = req.body;

	try {
		let messages = await Message.loadMessages(ids);
		res.send(messages);


	} catch(err) {
		console.log("Error at mongoserver matchedusersController.loadMessages");
	}



}