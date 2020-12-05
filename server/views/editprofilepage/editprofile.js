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

function readURL(input, id) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $(id).attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

function updateUserinfo(user) {
  //console.log(user.first_name);
  $('#first_last_name').text(user.first_name + ' ' + user.last_name);
  $('#last_name').val(user.last_name);
  $('#first_name').val(user.first_name);
  $('#email').val(user.email);
  $('#username').val(user.username);
  $('#username_tag').text('@' + user.username);
  $('#processname').text(user.username + ' PROFILE');
}

function updateProfileinfo(profile) {
  let profile_mimetype = profile.profile_img.mimetype;
  let profile_img_buffer = profile.profile_img.buff;
  let petprofile_mimetype = profile.pet.petImage.mimetype;
  let petprofile_img_buffer = profile.pet.petImage.buff;
  $('#profile_img').attr('src', 'data:' + profile_mimetype + ';base64,' + profile_img_buffer);
  //alert(profile.bio);
  $('#bio').val(profile.bio);
  $('#pet_image').attr('src', 'data:' + petprofile_mimetype + ';base64,' + petprofile_img_buffer);
  $('#pet_name').val(profile.pet.petName);
  $('#pet_age').val(profile.pet.age);
  $('#pet_description').val(profile.pet.description);
}

$(document).ready(function() {
  console.log('document ready');
  var url_list = window.location.href.split('/');
  var id = url_list.slice(url_list.length - 2)[0];
  
  $.ajax({
    url : '/admin/view/' + id + '/userinfo',
    type: 'GET',
    dataType: 'json',
    error: function(err) {
      console.log('Error!', err);
    },
    success: function(data) {
      console.log('Success!');
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

  $("#profile_img_input").change(function () {
        readURL(this, '#profile_img');
  });

  $("#pet_img_input").change(function () {
        readURL(this, '#pet_image');
  });

  $('#cancel_button').click(function() {
    window.location.href = '/admin/view/' + id;
  });

  $('#update_form').submit(function(e) {
    e.preventDefault();
    let formData_userinfo = new FormData();

    let last_name       = $('#last_name').val();
    let first_name      = $('#first_name').val();
    let username        = $('#username').val();
    let email           = $('#email').val();

    formData_userinfo.append('last_name', last_name);
    formData_userinfo.append('first_name', first_name);
    formData_userinfo.append('username', username);
    formData_userinfo.append('email', email);

    $.ajax({
        url : '/admin/view/' + id + '/edit/userinfo_submit',
        type: 'POST',
        data: formData_userinfo,
        error: function(err) {
          console.log('Error!', err);
        },
        success: function(data) {
          //alert(data);
          let formData_profile  = new FormData();
          let bio             = $('#bio').val();
          let pet_name        = $('#pet_name').val();
          let pet_age         = $('#pet_age').val();
          let pet_description = $('#pet_description').val();
          let profile_img     = $('#profile_img_input')[0].files[0];
          let pet_image       = $('#pet_img_input')[0].files[0];

          formData_profile.append('bio', bio);
          formData_profile.append('pet_name', pet_name);
          formData_profile.append('pet_age', pet_age);
          formData_profile.append('pet_description', pet_description);
          formData_profile.append('profile_img', profile_img);
          formData_profile.append('pet_img', pet_image);

          for (var key of formData_userinfo.entries()) {
            console.log(key[0] + ', ' + key[1]);
          }
          $.ajax({
            url : '/admin/view/' + id + '/edit/profileinfo_submit',
            type: 'POST',
            data: formData_profile,
            error: function(err) {
              console.log('Error!', err);
            },
            success: function(data) {
              alert(data);
              window.location.href = '/admin/view/' + id;
            //updateProfileinfo(data.data);
            },
            cache: false,
            contentType: false,
            processData: false
        });
          //updateProfileinfo(data.data);
        },
        cache: false,
        contentType: false,
        processData: false
    });
    
  });

});

// function displayDetails(temp){
//   var x = document.getElementById(temp);
//   if (x.style.display === "none") {
//     x.style.display = "block";
//   } else {
//     x.style.display = "none";
//   }
// }

