var $ = jQuery;
//filter function
// $(document).ready(function(){
//   $("#searchInput").on("keyup", function() {
//     var value = $(this).val().toLowerCase();
//     $("#userTable tr").filter(function() {
//       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//     });
//   });
// });

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

function addrow(user) {
  let td1 = "<td>" + user.id + "</td>";
  let td2 = "<td>" + user.username + "</td>";
  let td3 = "<td>" + user.first_name + "</td>"; 
  let td4 = "<td>" + user.last_name + "</td>";
  let td5 = "<td>" + user.email + "</td>";
  let td6 = "<td>" + user.account_type + "</td>";
  let td7 = "<td>" + "<button id=" + "view_" + user.id + " value= 'view'"+  ">View</button>" + "</td>";
  //let td6 = "<td>" + "<button id=" + "edit_" + rectangle.id + " value= 'edit'"+  ">EDIT</button>" + "</td>";  
  //let td5 = "<td>" + "<button>DELETE</button>" + "</td>";  
  $('#table tbody').append('<tr>' + td1 + td2 + td3 + td4 + td5 + td6 + td7 + '</tr>');
}

$(document).ready(function() {
  console.log("Document.ready");

  //ajax call to get all the users
  $.ajax({
    url: '/admin/getallusers',
    type: 'GET',
    dataType: 'json',
    error: function(err) {
      console.log('Error!', err);
    },
    success: function(data) {
      console.log('Success!');
      //console.log(data.data);
      let userlist = data.data;
      userlist.forEach(function (item, index) {
        addrow(item);
      });
    }
  });
});

// $(document).ready(function(){
//   $(".username").click(function(){
//     $.ajax({
//       url: '',
//       type: 'GET',
//       success: alert("Redirecte to the user page" )
//     })
//   })
// })

// var table = document.getElementById("table");
// if (table != null) {
//     for (var i = 0; i < table.rows.length; i++) {
//         for (var j = 0; j < table.rows[i].cells.length; j++)
//         table.rows[i].cells[1].onclick = function () {
//             redirecte(this);
//         };
//     }
// }

// function redirecte(tableCell) {
//     $.ajax({
//       url: '',
//       type: 'GET',
//       success: alert("Redirecte to the " + tableCell.innerHTML + " profile page")
//     })
    
// }
