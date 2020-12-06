/* image upload preview */
$('#img').change(function () {
	document.getElementById("imageTable").innerHTML="";
	console.log(this.files.length);

    for (var i=0, len = this.files.length; i < len; i++) {
        (function (j, self) {
            var reader = new FileReader()
            reader.onload = function (e) {


            var table = document.getElementById("imageTable");
			var row = table.insertRow(-1);
			
			var imageCell = row.insertCell(0);
			var imageSection = document.createElement("section");
			imageSection.setAttribute("class", "uploadedImage");
			imageCell.appendChild(imageSection);

			var image = document.createElement("img");
			image.setAttribute("class", "image");
			imageSection.appendChild(image);
			var imageFile = event.target;
			image.src = imageFile.result;

			var nameCell = row.insertCell(1);
			nameCell.innerHTML = self.files[j].name;
            }
            reader.readAsDataURL(self.files[j])
        })(i, this);
    }
});

/*auto fill form with get request
window.onload = function(){

}*/

$(document).ready(function() {
    $('form').on('submit',function(event) {
        event.preventDefault();
   		
   		let formData = new FormData(this);
        //console.log("this is a form: ");
        //console.log(formData.values());
        var sentTime = new Date();
        formData.append("time", sentTime);

   		console.log(localStorage.getItem('token'));

   		$.ajax({
            url: "/dogforadoption/submit",
            type: "POST",
            headers: {"Authorization": localStorage.getItem('token')},
            data: formData,
            error : function(err) {
                console.log('Error!', err)
            },
            success: function(data) {
                console.log(data)
                window.location.href = "/adoption";
            },
            cache: false,
            contentType: false,
            processData: false
        });


    });
});

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