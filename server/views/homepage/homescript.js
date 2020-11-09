/*onClick="document.getElementById('appname').style.display='hidden';"*/ 
function tologin(){
	document.getElementById('title').classList.add('fade');
	document.getElementById('home').classList.add('loginhome');
	document.getElementById('loginform').style.visibility ="visible";
	document.getElementById('loginbox').style.visibility ="visible";
}

//var formData = JSON.stringify($("#myForm").serializeArray());
var $ = jQuery;

function getFormUser() {
	return document.getElementById('username').value;
	
}

function getFormPw() {
	return document.getElementById('password').value;
}

$(document).ready(function() {
	console.log("document ready")

	$('#loginform').submit(function(e){
		e.preventDefault();
		//alert("ajax jquery request sent");
		var user = getFormUser();
		var pass = getFormPw();
		console.log(user);
		console.log(pass);
		var json_query = {};
		json_query.password = pass;
		json_query.username = user;
		JSON.stringify(json_query);
		console.log(json_query);
		
		$.ajax({
			url: "http://localhost:3000/login",
			type: 'POST',
			dataType: 'json',
			data: json_query,
			error : function(err) {
			  console.log('Error!', err)
			},
			success: function(data) {
			  console.log('Success!')
			  localStorage.setItem('token', JSON.stringify(data));
			  window.href = "localhost:3000/test" // redirect user
			}
		  });
		
		
	});
	
});


// $.ajax({ // use this to send the token when the server requires it, ex. accessing profile page
// 	url: "http://localhost:3000/login",
// 	type: 'GET',
// 	// Fetch the stored token from localStorage and set in the header
// 	headers: {"Authorization": localStorage.getItem('token')}
//   });