/*onClick="document.getElementById('appname').style.display='hidden';"*/ 
function tologin(){
	document.getElementById('title').classList.add('fade');
	document.getElementById('home').classList.add('loginhome');
	document.getElementById('loginform').style.visibility ="visible";
	document.getElementById('loginbox').style.visibility ="visible";
}

// Add jQuery for ajax.
var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByName('head')[0].appendChild(script);

$.ajax({
	url: "http://localhost:3000/login",
	type: 'POST',
	data: formData,
	error : function(err) {
	  console.log('Error!', err)
	},
	success: function(data) {
	  console.log('Success!')
	  localStorage.setItem('token', data.id_token);
	}
  });


$.ajax({
	url: "http://localhost:3000/login",
	type: 'GET',
	// Fetch the stored token from localStorage and set in the header
	headers: {"Authorization": localStorage.getItem('token')}
  });