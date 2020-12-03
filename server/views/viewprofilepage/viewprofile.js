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
          window.location = data.redirect;
      }
  });
}

function updateUserinfo(user) {
  console.log(user.first_name);
  $('#first_last_name').text(user.first_name + ' ' + user.last_name);
  $('#last_name').text(user.last_name);
  $('#first_name').text(user.first_name);
  $('#email').text(user.email);
  $('#username').text(user.username);
  $('#username_tag').text(user.username);
}

$(document).ready(function() {
  console.log("document ready");
  var url_list = window.location.href.split('/');
  var id = url_list.slice(-1)[0];

  $.ajax({
    url      : '/admin/view/' + id + '/userinfo',
    type     : 'GET',
    dataType : 'json',
    error: function(err) {
      console.log('Error!', err);
    },
    success: function(data) {
      console.log('Success!');
      updateUserinfo(data.data);
    }
  });
});