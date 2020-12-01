//var edit = document.getElementById("edit");
//edit.addEventListener("click", displayDetails);

var $ = jQuery;

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
      }
  });
}

function displayDetails(temp){
  var x = document.getElementById(temp);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

