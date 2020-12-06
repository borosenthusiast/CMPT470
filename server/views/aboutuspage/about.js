function userprofile(){
	$.ajax({

        url: "/profile/getUID",
        type: "GET",
        dataType: 'json',
        error : function(err) {
            console.log('Error!', err)
        },
        success: function(data) {
        	window.location.href = "/admin/view/" + data.uid; 
        }
    });	

}

var expireCookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

function logout() {
		console.log('signing out');
		localStorage.removeItem('token');
		sessionStorage.removeItem('token');
		expireCookie('Authentication');
		window.location.href = "/";

  }