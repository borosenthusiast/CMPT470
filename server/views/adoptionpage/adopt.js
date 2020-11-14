function dogcard(id){
	this.id = id; 
}

function deck(){
	//ajax to get dog or userid 
	this.ids = ['1','2','3','4','6','7'];	/* 6 demo id */
	var dogcards =[];

	for (var i = 0; i < this.ids.length;i++){
		dogcards.push(new dogcard(this.ids[i]));	
	}
	return dogcards;
}

//use this deck to pull dog attributes from db
var dogcarddeck = new deck();	

window.onload = function(){
	var posts = document.getElementById("adoptposts");
		for (var i = 0; i < dogcarddeck.length; i++){
			/*
			ajax to use each id(unique key) stored in dogcarddeck to fetch attributes from db 
			*/

			/*
			dog card section
			*/
			var dogcard = document.createElement("section");
			dogcard.setAttribute("class", "dogcard");
			posts.appendChild(dogcard);

			//dog profile image
			var image = document.createElement("section");
			image.setAttribute("class", "image");

			//dog name
			var dogname = document.createElement("h");
			var dognametext = document.createTextNode("WAFFLES");
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

