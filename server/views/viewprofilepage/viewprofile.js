//var edit = document.getElementById("edit");
//edit.addEventListener("click", displayDetails);

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