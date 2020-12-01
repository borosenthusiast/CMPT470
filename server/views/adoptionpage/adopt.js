var filterstat = ["newest","all","all","all"];

function dogcard(id){ //input other attributes as well 
	this.id = id; //unique key
	/*
	this.image = image;
	this.name = name;
	this.gender = gender;
	this.weight = weight;
	this.age = age;
	this.location = location;
	this.postdate = postdate;*/ 
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

    	console.log(data);

  	});
	/*
	ajax to get dog table according to filterstat (ORDER BY)
	jasonquery = filterstat;
	*/

	//get all dogs data: no need to send request data
	
	this.ids = ['1','3','4','5','6','7'];	/* 6 demo id */
	if (filterstat != undefined && filterstat[0] == "oldest" ){
		this.ids.sort(function(a,b){return b-a});
	} 


	/*create cards and insert to deck*/
	var dogcards =[];
	for (var i = 0; i < this.ids.length;i++){
		dogcards.push(new dogcard(this.ids[i]));	
	}
	return dogcards;
}

//use this deck to pull dog attributes from db
var dogcarddeck = new deck();	

window.onload = function(){
	updatecards(dogcarddeck);

	
}

function updatecards(dogcarddeck){

	var posts = document.getElementById("adoptposts");
		for (var i = 0; i < dogcarddeck.length; i++){

			var dogcard = document.createElement("section");
			dogcard.setAttribute("class", "dogcard");
			posts.appendChild(dogcard);

			//dog profile image
			var image = document.createElement("section");
			image.setAttribute("class", "image");

			//dog name
			var dogname = document.createElement("h");
			var dognametext = document.createTextNode(dogcarddeck[i].id);
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
			var profiletext = document.createTextNode("FEMALE / 3KG / 2 YEARS OLD");
			dogprofile.appendChild(profiletext);
			dogprofile.setAttribute("class", "dogprofile");

			//dog location
			var doglocation = document.createElement("p");
			var locationtext = document.createTextNode("BURNABY, BC");
			doglocation.appendChild(locationtext);
			doglocation.setAttribute("class", "doglocation");

			//date posted
			var dateposted = document.createElement("p");
			var datetext = document.createTextNode("POSTED: NOV-13-2020");
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
		console.log("clicked!");

});


$("#tabbutton").click(function(){
	console.log(filterstat);

	var newdeck = deck(filterstat);
	//empty posts and reupdate
	document.getElementById("adoptposts").innerHTML="";
	updatecards(newdeck);
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


function setgenderfilter(n){
	for (var i = 0; i < 3; i++){
		$(".genderoption")[i].style.color="gray";
		if ( i == n){
			$(".genderoption")[i].style.color="black";
			filterstat[1] = $(".genderoption")[i].id;
		} 
	}
}

function setweightfilter(n){
	for (var i = 0; i < 5; i++){
		$(".weightoption")[i].style.color="gray";
		if (i==n){
			$(".weightoption")[i].style.color="black";
			filterstat[2] = $(".weightoption")[i].id;
		}
	}
}

function autoscrollTop(){
	$('html, body').animate({scrollTop: '0px'}, 0);
}