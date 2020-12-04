



var imageIndex;
var imageArray = new Array();

function loadimages(n){
	document.getElementById("imagesection").innerHTML="";
	var imagepages = document.createElement("p");
	var pagetext = document.createTextNode(n+1 + "/" +imageArray.length);
	imagepages.appendChild(pagetext);
	imagepages.setAttribute("id", "imagenumber");

	var imagesection = document.getElementById("imagesection");
	var image = new Image();
	image.src = imageArray[n];
	image.setAttribute("class", "image");

	imagesection.appendChild(imagepages);
	imagesection.appendChild(image);


	
	imageIndex = n;
}

function updatedogname(dognametext){
	/*console.log($("#dogname").text());*/ 
	document.getElementById("dogname").innerHTML = "MEET " + dognametext;
}

window.onload = function(){
	var dogforadoption = localStorage.getItem("dogforadoption");
	var converted_dogforadoption = parseInt(dogforadoption,10);
	const reqData = {
		dogid: converted_dogforadoption
	}

	$.ajaxSetup({
		headers: {"Authorization": localStorage.getItem('token')}
	});
	$.post("/adoptionprofile/loadDog", reqData, function(result){

		var dognametext = result.name;
		updatedogname(dognametext);

		document.getElementById("info").innerHTML = "AGE: " + result.age + " " + result.monthyear + "<br>" +
													"GENDER: " + result.gender + "<br>" +
													"BREED: " + result.breed + "<br>" +
													"<br>" + "<br>" +
													"SHELTER: " + result.agencyName +
													"LOCATION: " + result.location +
													"WEBSITE: " + result.website + 
													"TEL: " + result.tel +
													"<br>" + "<br>" +
													"POSTED: " + result.time;
	
		document.getElementById("aboutme").innerHTML = result.description;


	});
	/*
	AJAX get req dog info 
	*/
	/*temp image array. */
	imageArray[0] = "../images/sample_adopt_profile(2).jpg";
	imageArray[1] = "../images/sample_adopt_profile(3).jpg";
	imageArray[2] = "../images/sample_adopt_profile(4).jpg";

	loadimages(0);

}


function slideright(){
	if (imageArray.length == imageIndex+1){
		imageIndex = 0;
	} else {
		imageIndex++;
	}
	loadimages(imageIndex);
	/*document.getElementById("imagenumber").innerHTML = imageIndex+1 + "/" +imageArray.length;*/
	
}

function slideleft(){
	if (imageIndex == 0){
		imageIndex = imageArray.length - 1;
	} else {
		imageIndex--;
	}
	loadimages(imageIndex);
	/*document.getElementById("imagenumber").innerHTML = imageIndex+1 + "/" +imageArray.length;*/

}