var axios = require("axios");

var Message = function(inputmessageData) {
	this.senderId = inputmessageData.senderId;
	this.targetuser = inputmessageData.targetuser;
	this.message = inputmessageData.message;
	this.attachedimg = inputmessageData.attachedimg;
	this.time = inputmessageData.time;
	//this.b64img = inputmessageData.b64img;
}

Message.newmessage = async(messagetosend) => {
	let response = await axios.post('http://localhost:8081/matchedusers/newmessage', messagetosend);
	return response.data;

}

Message.loadMessages = async (ids) => {
	let loadedMessages = await axios.post('http://localhost:8081/matchedusers/loadMessages', ids);
	return loadedMessages.data;
}

Message.lastMessage = async (ids)=>{
	let lastMessage = await axios.post('http://localhost:8081/matchedusers/lastMessage', ids);
	return lastMessage.data;

}



module.exports = Message;
		
