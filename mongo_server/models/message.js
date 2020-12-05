var mongo_db = require("./mongodb.js");

var Message = function(messageData) {
	this.senderId = messageData.senderId;
	this.targetuser = messageData.targetuser; //need to be parseInt(10) in view
	this.message = messageData.message;
	this.attachedimg = messageData.attachedimg;
	this.time = messageData.time;
	//this.b64img = messageData.b64img;
}



Message.addnewmessage = async (messageData) =>{

	try{
		let message_collection = await mongo_db.mongo_collection('Messages');
		
		let result = await message_collection.insertOne( 
						{
							senderId: messageData.senderId, 
							targetuser: messageData.targetuser,
							message: messageData.message,
							attachedimg: messageData.attachedimg,
							time: messageData.time,
							//b64img: messageData.b64img

						}

		);

		return result;

	} catch(err){
		console.log(err);
		console.log("Error in Message.addnewmessage");
	}

}

Message.loadMessages = async(ids) =>{
	var ids_senderId = ids.senderId;
	var ids_targetuser = ids.targetuser;
	converted_ids_targetuser = parseInt(ids_targetuser,10);

	try{
		let message_collection = await mongo_db.mongo_collection('Messages');

		let query1 = [
						{	$match: {senderId: { $eq: ids_senderId }}	},
						{	$match: {targetuser: {$eq: converted_ids_targetuser}}	},
						{	$sort: {time: 1}	},
						{	$project: {senderId: 1, targetuser:1, message:1, attachedimg:1, time:1}	}
					];
		
		let result1 = await message_collection.aggregate(query1).toArray();
	
		let query2 = [
						{	$match: {senderId: { $eq: converted_ids_targetuser} }	},
						{	$match: {targetuser: {$eq: ids_senderId} }	},
						{	$sort: {time: 1}	},
						{	$project: {senderId: 1, targetuser:1, message:1, attachedimg:1, time:1}	}
					];
		
		let result2 = await message_collection.aggregate(query2).toArray();

		var result = result1.concat(result2);


		return result;

	}catch(err){
		console.log(err);
		console.log("Error in Message.loadMessages");
	}
}

module.exports = Message;