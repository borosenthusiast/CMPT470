var $ = jQuery;

function getFormUser() {
	return document.getElementById('username').value;
	
}

function getFormPw() {
	return document.getElementById('password').value;
}

$(document).ready(function() {
	console.log("document ready")

	$('#registrationform').submit(function(e){
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
			url: "http://localhost:3000/register/submit",
			type: 'POST',
			dataType: 'json',
			data: json_query,
			error : function(err) {
			  console.log('Error!', err)
			},
			success: function(data) {
			  console.log('Success!')
			  window.href = "localhost:3000/profile";
			}
		  });
		
		
	});
	
});