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
			url: "/login",
			type: 'POST',
			dataType: 'json',
			data: json_query,
			error : function(err) {
			  console.log('Error!', err)
			  alert("Incorrect Login Username or Password")
			},
			success: function(data) {
			  console.log('Success logging in!');
			  localStorage.setItem('token', JSON.stringify(data));
			  $.ajax({
				url: "/cardflip",
				type: "GET",
				headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
				error: function(err) {
					console.log('Error in redirect', err)
					alert("Error redirecting user to card flip page")
				},
				success: function(data) {
					console.log('Success sending token!')
					window.location.href = "/cardflip";
				}
				// send the token when redirecting the user
			  });
			}
		  });
		
		
	});
	
});

