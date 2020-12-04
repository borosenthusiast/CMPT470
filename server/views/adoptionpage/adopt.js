var filterstat = ["oldest"];


function dogcard(name, images, gender, age, monthyear, postdate, location, id){ //input other attributes as well 
	this.name = name; //unique key
	
	this.images = images;
	this.gender = gender;
	this.age = age;
	this.monthyear = monthyear;
	this.postdate = postdate;
	this.location = location;
	this.id = id;
}

function genderdrop(){
	document.getElementById("genderfilter").style.visibility="visible";
}
function genderpullup(){
	document.getElementById("genderfilter").style.visibility="hidden";
}
function weightdrop(){
	document.getElementById("weightfilter").style.visibility="visible";
}
function weightpullup(){
	document.getElementById("weightfilter").style.visibility="hidden";
}




function deck(filterstat){
	$.ajax({
    	url: "/adoption/alldogs",
    	type: "GET",
    	headers: {"Authorization": localStorage.getItem('token')},
  		}).done(function(data) {
  			var allDogs = data;

  		if (filterstat != undefined && filterstat[0] == "oldest" ){
			allDogs = allDogs.sort(sortByDate);
	
		} 

		
		var dogcards =[];
		for (var i = 0; i < allDogs.length;i++){
			dogcards.push(new dogcard(allDogs[i].name, 
									allDogs[i].dogimgs,
									allDogs[i].gender,
									allDogs[i].age,
									allDogs[i].monthyear,
									allDogs[i].time,
									allDogs[i].location,
									allDogs[i].id
						 ));	
		}
		
		updatecards(dogcards);


  	});



}

//use this deck to pull dog attributes from db


function sortByDate(a, b){
	if ( a.time < b.time){
		return 1;
	}
	if (a.time > b.time){
		return -1;
	}
	return 0;
}



window.onload = function(){
	var dogcarddeck = new deck();	
	//updatecards(dogcarddeck);

	
}

function updatecards(dogcarddeck){

	var posts = document.getElementById("adoptposts");
		for (var i = 0; i < dogcarddeck.length; i++){

			var dogcard = document.createElement("section");
			dogcard.setAttribute("class", "dogcard");
			posts.appendChild(dogcard);
			dogcard.id = dogcarddeck[i].id;
			console.log("id is: " + dogcard.id); 


			//dog profile image
			var image = document.createElement("section");
			image.setAttribute("class", "image");

			//dog name
			var dogname = document.createElement("h");
			var dognametext = document.createTextNode(dogcarddeck[i].name);
			dogname.appendChild(dognametext);
			dogname.setAttribute("class", "dogname");

			//dog information section
			var doginfo = document.createElement("section");
			doginfo.setAttribute("class", "doginfo");

			//dogcard elements
			dogcard.appendChild(image);
			dogcard.appendChild(dogname);
			dogcard.appendChild(doginfo);



			/*
			doginfo section
			*/
			//dog profile


			var dogprofile = document.createElement("p");
			var profiletext = document.createTextNode( dogcarddeck[i].gender + " / "
													+ dogcarddeck[i].age + " "
													+ dogcarddeck[i].monthyear);
			dogprofile.appendChild(profiletext);
			dogprofile.setAttribute("class", "dogprofile");

			//dog location
			var doglocation = document.createElement("p");
			var locationtext = document.createTextNode(dogcarddeck[i].location);
			doglocation.appendChild(locationtext);
			doglocation.setAttribute("class", "doglocation");

			//date posted
			var dateposted = document.createElement("p");
			var datetext = document.createTextNode(dogcarddeck[i].postdate);
			dateposted.appendChild(datetext);
			dateposted.setAttribute("class", "dateposted");

			//doginfo elements
			doginfo.appendChild(dogprofile);
			doginfo.appendChild(doglocation);
			doginfo.appendChild(dateposted);			
		}

}

//click card send get request to load dog/adoption agency profile
$(document).on('click', '.dogcard', function() {
	localStorage.setItem("dogforadoption", this.id);
	window.location.href = "/adoptionprofile";

});


$("#tabbutton").click(function(){
	console.log(filterstat);

	deck(filterstat);
	//empty posts and reupdate
	document.getElementById("adoptposts").innerHTML="";

});


$("#datefilter").click(function(){
	var $this = $(this);
	$this.toggleClass("li");
	if ($this.hasClass("li")){
		$this.text('OLDEST');
		filterstat[0] = "oldest"

	}else{
		$this.text('NEWEST');
		filterstat[0] = "newest"
		
	}
});


/*function setgenderfilter(n){
	for (var i = 0; i < 3; i++){
		$(".genderoption")[i].style.color="gray";
		if ( i == n){
			$(".genderoption")[i].style.color="black";
			filterstat[1] = $(".genderoption")[i].id;
		} 
	}
}*/

/*function setweightfilter(n){
	for (var i = 0; i < 5; i++){
		$(".weightoption")[i].style.color="gray";
		if (i==n){
			$(".weightoption")[i].style.color="black";
			filterstat[2] = $(".weightoption")[i].id;
		}
	}
}*/

function autoscrollTop(){
	$('html, body').animate({scrollTop: '0px'}, 0);
}