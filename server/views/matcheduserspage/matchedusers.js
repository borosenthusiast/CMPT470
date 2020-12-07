window.onload = function(){
	readMatchedUsers();
	var chosenId = localStorage.getItem("chosenId");
	loadMessages(chosenId);

}

function userprofile(){
	$.ajax({

        url: "/profile/getUID",
        type: "GET",
        dataType: 'json',
        error : function(err) {
            console.log('Error!', err)
        },
        success: function(data) {
        	window.location.href = "/admin/view/" + data.uid; 
        }
    });	

}

function producecards(matcheduser){

	const reqData = {
		targetuser: matcheduser.userId
	}

	$.ajaxSetup({
		headers: {"Authorization": localStorage.getItem('token')}
	});
	$.post("/matchedusers/lastMessage", reqData, function(result){
		var messages = result.sort(sortByDate);
		var lastmessage = messages[messages.length-1];

		var matchedusers = document.getElementById("matchedusers");

	var usercard = document.createElement("section");
	usercard.setAttribute("class", "usercard");
	matchedusers.appendChild(usercard);

	var profileimage = document.createElement("img");
	profileimage.setAttribute("class", "profileimage");
	usercard.appendChild(profileimage);	//read profile_img to view

	var imgindata = matcheduser.profile_img;
	profileimage.src = 'data:' + imgindata.mimetype + ';base64,' + imgindata.buff;


	var description = document.createElement("section");
	description.setAttribute("class", "description");
	usercard.appendChild(description);

	var username = document.createElement("h");
	username.setAttribute("class", "username");
	description.appendChild(username);
		//var usernametext = document.createTextNode(i);
	var usernametext = document.createTextNode(matcheduser.username);
	username.appendChild(usernametext);

	var preview = document.createElement("p");
	preview.setAttribute("class", "preview");
	description.appendChild(preview);	//grab newest message


	preview.innerHTML = lastmessage.message;


	usercard.id = matcheduser.userId; //username as id (for convenience in searching)


	});




}


function prependcard(chosenuser){
	const reqData = {
		targetuser: chosenuser.userId
	}

	$.ajaxSetup({
		headers: {"Authorization": localStorage.getItem('token')}
	});
	$.post("/matchedusers/lastMessage", reqData, function(result){
		var messages = result.sort(sortByDate);
		var lastmessage = messages[messages.length-1];


	var matchedusers = document.getElementById("matchedusers");

	var usercard = document.createElement("section");
	usercard.setAttribute("class", "usercard");
	matchedusers.prepend(usercard);
	usercard.style.backgroundColor = "#CABFDA";

	var profileimage = document.createElement("img");
	profileimage.setAttribute("class", "profileimage");
	usercard.appendChild(profileimage);	//read profile_img to view

	var imgindata = chosenuser.profile_img;
	profileimage.src = 'data:' + imgindata.mimetype + ';base64,' + imgindata.buff;

	var description = document.createElement("section");
	description.setAttribute("class", "description");
	usercard.appendChild(description);

	var username = document.createElement("h");
	username.setAttribute("class", "username");
	description.appendChild(username);
		//var usernametext = document.createTextNode(i);
	var usernametext = document.createTextNode(chosenuser.username);
	username.appendChild(usernametext);

	var preview = document.createElement("p");
	preview.setAttribute("class", "preview");
	description.appendChild(preview);	//grab newest message
	preview.innerHTML = lastmessage.message;

	usercard.id = chosenuser.userId; //username as id (for convenience in searching)

	});

}


function initMatches(matcheslist){
	var matched = matcheslist;
	var chosenId = localStorage.getItem("chosenId");
	console.log("chosenID is: " + chosenId);



	for (var i = 0; i < matched.length; i ++){
		if (matched[i].userId != chosenId){
			producecards(matched[i]);
		} else {
			prependcard(matched[i]);

		}	

	}
}

function readMatchedUsers(){
	/*ajax to get matched users*/
	$.ajaxSetup({
		headers: {"Authorization": localStorage.getItem('token')}
	});
	$.get("/matchedusers/getmatchedusers", function(result){
		console.log(result);
		initMatches(result);
	});

	
}



$(document).ready(function(){
	$("#messageForm").on("submit", function(event){
		event.preventDefault();
		let formData = new FormData(this);
		
		var selectedChat = localStorage.getItem("selectedChat");
		selectedChat = parseInt(selectedChat,10);
		

		console.log("selected chat is: " + selectedChat);
		if (selectedChat != null){

			var sentTime = new Date();
			
			formData.append("targetuser", selectedChat);
			formData.append("time", sentTime);
			//console.log("selected chat is: " + selectedChat);


   			$.ajax({
            	url: "/matchedusers/newmessage",
            	type: "POST",
            	headers: {"Authorization": localStorage.getItem('token')},
            	data: formData,
            	error : function(err) {
                	console.log('Error!', err)
            	},
            	success: function(data) {
            		var messageForm = document.getElementById("messageForm");
					messageForm.reset();
					document.getElementById("imgpreview").innerHTML = "";

                	loadMessages(selectedChat);
            	},
            	cache: false,
            	contentType: false,
            	processData: false
        	});


		}

		

	});

});

function sortByDate(a, b){
	if ( a.time < b.time){
		return -1;
	}
	if (a.time > b.time){
		return 1;
	}
	return 0;
}

function loadMessages(selectedChat){
	const reqData = {
		targetuser: selectedChat
	}

	$.ajaxSetup({
		headers: {"Authorization": localStorage.getItem('token')}
	});
	$.post("/matchedusers/loadMessages", reqData, function(result){
		var messageWindow = document.getElementById("messages");
		messageWindow.innerHTML = "";

		var messages = result.sort(sortByDate);

		for (var i = 0; i < messages.length; i++){
			if (messages[i].attachedimg != null ){

				var imgmessage = document.createElement("section");
				imgmessage.setAttribute("class", "message");
				imgmessage.style.padding = "10px";

				var imgSection = document.createElement("section");
				imgSection.setAttribute("class", "attachedimg");
				imgmessage.appendChild(imgSection);



				var image = document.createElement("img");
				image.setAttribute("class", "imageinmessage");
				var img = messages[i].attachedimg;
				image.src = 'data:' + img.mimetype + ';base64,' + img.buff;

				imgSection.appendChild(image);
				

				if (messages[i].targetuser == parseInt(selectedChat,10)){
					imgmessage.style.float = "right";
					imgmessage.style.backgroundColor = "#CABFDA";
				} else {
					imgmessage.style.float = "left";
				}

				messageWindow.appendChild(imgmessage);
				
			}

			if (messages[i].message != null ){
				var message = document.createElement("section");
				message.setAttribute("class", "message");	
				message.innerHTML = messages[i].message;
				message.style.padding = "10px";


				if (messages[i].targetuser == parseInt(selectedChat,10)){
					message.style.float = "right";	
					message.style.backgroundColor = "#CABFDA";
				
				} else {
					message.style.float = "left";
			
				}

			
				messageWindow.appendChild(message);
			}
			
		}

		messageWindow.scrollTop = messageWindow.scrollHeight;


		//update preview
		var lastmessage = messages[messages.length-1];
		var matchedusers = document.getElementsByClassName("usercard");

		console.log("who should be updated?");
		for (var i = 0; i < matchedusers.length; i++){
			if (matchedusers[i].id == selectedChat){
				var preview = matchedusers[i].childNodes[1].childNodes[1];
				preview.innerHTML = lastmessage.message;
				preview.setAttribute("class", "preview");
			}
		}
		

	});


}




$('#img').change(function () {
	console.log(this.files.length);
	console.log(this.files[0].name);
	document.getElementById("imgpreview").innerHTML = "attached: " + this.files[0].name;
});

$(document).ready(function(){
	$("#refreshButton").on("click",function(event){
		var selectedChat = localStorage.getItem("selectedChat");
		selectedChat = parseInt(selectedChat,10);

		loadMessages(selectedChat);
	});
});


$(document).ready(function(){
	$("#searchForm").on("submit", function(event){
		

		event.preventDefault();
		var matchedusersSection = document.getElementById("matchedusers");

		var searchElement = document.getElementById("searchbox").value;
		if (searchElement === ""){
			var matchedusers = document.getElementsByClassName("usercard");
			for (var i = 0; i < matchedusers.length; i++){
				matchedusers[i].style.backgroundColor = "white";
			}

		} else {	
			var matchedusers = document.getElementsByClassName("usercard");

			for (var i = 0; i < matchedusers.length; i++){
				var matcheduserName = matchedusers[i].childNodes[1].childNodes[0];

				if (matcheduserName.innerHTML == searchElement){

					var tempUserCard = matchedusers[i];
					matchedusers[i].remove();
					matchedusersSection.prepend(tempUserCard);

					//tempUserCard.style.backgroundColor = "#CABFDA";


				} else {
					//matchedusers[i].style.backgroundColor = "white";
					//console.log("not found");
				}
			}
		


		}

	});

});




$(document).on('click', '.usercard', function() {
		var thisId = this.id;
		loadMessages(thisId);
		localStorage.setItem("selectedChat", thisId );


		var matchedusers = document.getElementsByClassName("usercard");

		for (var i = 0; i < matchedusers.length; i++){
			if (matchedusers[i].id == this.id){
				matchedusers[i].style.backgroundColor = "#CABFDA";
			} else {
				matchedusers[i].style.backgroundColor = "white";
					//console.log("not found");
			}
		}
		


});