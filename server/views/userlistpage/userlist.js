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

$(document).ready(function(){
  $(".username").click(function(){
    $.ajax({
      url: '',
      type: 'GET',
      success: alert("Redirecte to the user page")
    })
  })
})

