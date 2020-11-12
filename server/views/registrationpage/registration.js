var $ = jQuery;

function getFirstName() {
	return document.getElementById('first_name').value;
}

function getLastName() {
	return document.getElementById('last_name').value;
}

function getFormEmail() {
	return document.getElementById('email').value;
}

function getFormUser() {
	return document.getElementById('username').value;
	
}

function getFormPw() {
	return document.getElementById('password').value;
}

function getFormAccountType() {
	return document.getElementById('account_type').value; 
}

$(document).ready(function() {
	console.log("document ready")

	$('#registrationform').submit(function(e){
		e.preventDefault();
		//alert("ajax jquery request sent");
		var first_name = getFirstName();
		var last_name = getLastName();
		var email = getFormEmail();
		var account_type = getFormAccountType();
		var user = getFormUser();
		var pass = getFormPw();
		
		console.log(first_name);
		console.log(last_name);
		console.log(email);
		console.log(user);
		console.log(pass);
		console.log(account_type);
		
		var json_query = {};
		json_query.first_name = first_name;
		json_query.last_name = last_name;
		json_query.email = email;
		json_query.password = pass;
		json_query.username = user;
		json_query.account_type = account_type;
		JSON.stringify(json_query);
		console.log(json_query);
		
		$.ajax({
			url: "/register/submit",
			type: 'POST',
			dataType: 'json',
			data: json_query,
			error : function(err) {
			  console.log('Error!', err)
			},
			success: function(data) {
			  console.log('Success!')
			  window.location.href = "/profile";
			}
		  });
		
		
	});
	
});