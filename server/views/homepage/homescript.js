/*onClick="document.getElementById('appname').style.display='hidden';"*/ 


function tologin(){
	document.getElementById('title').classList.add('fade');
	document.getElementById('home').classList.add('loginhome');
	document.getElementById('loginform').style.visibility ="visible";
	document.getElementById('loginbox').style.visibility ="visible";

	function submitLogin() {
		username = document.getElementById('username').value;
		password = document.getElementById('password').value;
		
	}

	document.getElementById('loginbutton').addEventListener('click', submitLogin);
}
