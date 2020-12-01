//var $ = jQuery;
//filter function
$(document).ready(function(){
  $("#searchInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#userTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

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
          window.location = data.redirect;
      }
  });
}

// $(document).ready(function(){
//   $(".username").click(function(){
//     $.ajax({
//       url: '',
//       type: 'GET',
//       success: alert("Redirecte to the user page" )
//     })
//   })
// })

var table = document.getElementById("table");
if (table != null) {
    for (var i = 0; i < table.rows.length; i++) {
        for (var j = 0; j < table.rows[i].cells.length; j++)
        table.rows[i].cells[1].onclick = function () {
            redirecte(this);
        };
    }
}

function redirecte(tableCell) {
    $.ajax({
      url: '',
      type: 'GET',
      success: alert("Redirecte to the " + tableCell.innerHTML + " profile page")
    })
    
}
