/*onClick="document.getElementById('appname').style.display='hidden';"*/ 
function tologin(){
	document.getElementById('title').classList.add('fade');
	document.getElementById('home').classList.add('loginhome');
	document.getElementById('loginform').style.visibility ="visible";
	document.getElementById('loginbox').style.visibility ="visible";
}

//var formData = JSON.stringify($("#myForm").serializeArray());
var $ = jQuery;

$(document).ready(function() {
	console.log("document ready")

	$('#loginform').submit(function(e){
		e.preventDefault();
		alert("ajax jquery request sent")
		var form = $(this);
		var url = form.attr('action');
		console.log(form.username)
		
		$.ajax({
			url: "http://localhost:3000/login",
			type: 'POST',
			dataType: 'json',
			data: form.serialize(),
			error : function(err) {
			  console.log('Error!', err)
			},
			success: function(data) {
			  console.log('Success!')
			  localStorage.setItem('token', data.id_token);
			}
		  });
		
		
	});
	
});


// $.ajax({
// 	url: "http://localhost:3000/login",
// 	type: 'GET',
// 	// Fetch the stored token from localStorage and set in the header
// 	headers: {"Authorization": localStorage.getItem('token')}
//   });