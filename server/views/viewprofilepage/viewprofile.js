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

function updateUserinfo(user) {
  console.log(user.first_name);
  $('#first_last_name').text(user.first_name + ' ' + user.last_name);
  $('#last_name').text(user.last_name);
  $('#first_name').text(user.first_name);
  $('#email').text(user.email);
  $('#username').text(user.username);
  $('#username_tag').text('@' + user.username);
  $('#processname').text(user.username + ' PROFILE');
}

function updateProfileinfo(profile) {
  console.log(profile);
  let profile_mimetype = profile.profile_img.mimetype;
  let profile_img_buffer = profile.profile_img.buff;
  let petprofile_mimetype = profile.pet.petImage.mimetype;
  let petprofile_img_buffer = profile.pet.petImage.buff;
  $('#profile_img').attr('src', 'data:' + profile_mimetype + ';base64,' + profile_img_buffer);
  $('#bio').text(profile.bio);
  $('#pet_image').attr('src', 'data:' + petprofile_mimetype + ';base64,' + petprofile_img_buffer);
  $('#pet_name').text(profile.pet.petName);
  $('#pet_age').text(profile.pet.age);
  $('#pet_description').text(profile.pet.description);
}

$(document).ready(function() {
  console.log("document ready");
  var url_list = window.location.href.split('/');
  var id = url_list.slice(-1)[0];


  $('#edit_button').click(function() {
    window.location.href = '/admin/view/' + id + '/edit';
  });
  //user info from mysql
  $.ajax({
    url      : '/admin/view/' + id + '/userinfo',
    type     : 'GET',
    dataType : 'json',
    error: function(err) {
      console.log('Error!', err);
    },
    success: function(data) {
      console.log('Success!');
      //console.log(data.data);
      updateUserinfo(data.data);
    }
  });

  $.ajax({
    url : '/admin/view/' + id + '/profileinfo',
    type: 'GET',
    dataType: 'json',
    error: function(err) {
      console.log('Error!', err);
    },
    success: function(data) {
      console.log('Success!');
      console.log(data);
      updateProfileinfo(data.data);
    }
  });
});