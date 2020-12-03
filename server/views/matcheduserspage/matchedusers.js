window.onload = function(){
	readMatchedUsers();
}

function initMatches(matcheslist){
	var matched = matcheslist;

	var matchedusers = document.getElementById("matchedusers");
	for (var i = 0; i < matched.length; i++){
		var usercard = document.createElement("section");
		usercard.setAttribute("class", "usercard");
		matchedusers.appendChild(usercard);

		var profileimage = document.createElement("section");
		profileimage.setAttribute("class", "profileimage");
		usercard.appendChild(profileimage);	//read profile_img to view

		var description = document.createElement("section");
		description.setAttribute("class", "description");
		usercard.appendChild(description);

		var username = document.createElement("h");
		username.setAttribute("class", "username");
		description.appendChild(username);
		var usernametext = document.createTextNode(matched[i].username);
		username.appendChild(usernametext);

		var preview = document.createElement("p");
		preview.setAttribute("class", "preview");
		description.appendChild(preview);	//grab newest message
		preview.innerHTML = "thisispreviewmessage.clicktoseemore";


		usercard.id = matched[i].userId; //give id to each card

	}
}

function readMatchedUsers(){
	/*ajax to get matched users*/
	$.ajaxSetup({
		headers: {"Authorization": localStorage.getItem('token')}
	});
	$.get("/matchedusers/getmatchedusers", function(result){
		
		initMatches(result);
	});

	
}



$(document).ready(function(){
	$("#messageForm").on("submit", function(event){
		event.preventDefault();
		/*post request message*/
		console.log("send message!")
		/*
		(put image in section, class uploadedImage,
		appened input text,)

		append above into text bubble and append to #messages
		*/

		messageWindow.scrollTop = messageWindow.scrollHeight;

	});

});


$('#img').change(function () {
	console.log(this.files.length);
	console.log(this.files[0].name);
	document.getElementById("imgpreview").innerHTML = "attached: " + this.files[0].name;
});


$(document).ready(function(){
	$("#searchForm").on("submit", function(event){
		event.preventDefault();
		/*get request user id*/
		console.log("search!");
		/*
		appened searched user card
		*/
	});

});




$(document).on('click', '.usercard', function() {
		console.log(this.id);
		/*
		get request to grab conversation
		(divide conversation by userid)
		*/
		var conversation = ["hi", "hello", 
		"In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.", 
		"Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.",
		"sljglsn einvera for slkn is hlrnl",
		"gsljs sljgs",
		"roinb nspn rnpsnpn roihn",
		"blshhhhh seinbs",
		"balnbe ibrpnsliweah hinbasi sein slein ig, slien gos ah. sline rigs lie",
		"evinsi seiings sgeah i isease",
		"aseinavl  ein s bpen aivns lie n li ne alie iei nnbnalb  liea",
		"aeinblin alienlvi nlhn lrnslkbeqjw ;aon skelbk ein rsl idhj nseiq in"];

		var messageWindow = document.getElementById("messages");
		messageWindow.innerHTML = "";
		for (var i = 0; i < conversation.length; i++){

			var message = document.createElement("section");
			message.setAttribute("class", "message");	
			message.innerHTML = conversation[i];
			message.style.padding = "10px";

			if (i % 2 == 0){
				message.style.float = "right";	
				message.style.backgroundColor = "#CABFDA";
			} else {
				message.style.float = "left";
			}
			
			messageWindow.appendChild(message);
			
		}

		/*auto scroll to bottom*/
		messageWindow.scrollTop = messageWindow.scrollHeight;



});