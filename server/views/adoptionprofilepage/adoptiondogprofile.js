function logout() {
	$.ajax({
		url: "/logout",
		type: "GET",
		error: function(err) {
			console.log("Failed to log out with error: ", err)
		},
		success: function(data) {
			localStorage.removeItem('token');
			sessionStorage.removeItem('token');
			window.location = data.redirect;
		}
	});
  }



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
	/*
	AJAX get req dog info 
	*/
	/*temp image array. */
	imageArray[0] = "../images/sample_adopt_profile(2).jpg";
	imageArray[1] = "../images/sample_adopt_profile(3).jpg";
	imageArray[2] = "../images/sample_adopt_profile(4).jpg";

	var dognametext = "WAFFLES";
	updatedogname(dognametext);
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