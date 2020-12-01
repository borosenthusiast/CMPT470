

/*after DB setup, pull 10-15 user profiles to put in array, insert as cards to html page*/
/*for now, 4 demo cards*/

/*keeping record of swiped left and right profiles*/
var addedlist = [];
var subtractedlist = [];


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



function card(id){
	this.id = id; 
}

function deck(){
	/*ajax*/
	this.ids = ['1','2','3','4'];	/* 4 demo id */
	var cards =[];

	for (var i = 0; i < this.ids.length;i++){
		cards.push(new card(this.ids[i]));	
	}
	return cards;
}

var carddeck = new deck();


window.onload = function(){

	var ul = document.getElementById("cards");
	for (var i = 0; i < carddeck.length; i++){
		var li = document.createElement("li");
		
		ul.appendChild(li);
	}

	$("li").addClass("card");


}

function minusnumber(){
	var flipsleft = parseInt(document.getElementById("flipsleft").innerHTML,10);
	if (flipsleft == 0){
		return;
	}
	flipsleft--;
	document.getElementById("flipsleft").innerHTML = flipsleft;

}

/*leftbutton.onclick*/
$(document).ready(function(){
	$("#leftbutton").click(function(){
		minusnumber();
		$('#cards li:last').animate({
			right:'150px'
		},'fast');
		$('#cards li:last').fadeOut('fast',function(){
			/*console.log($(this).html());*/
			addedlist.push($(this).html()); /*record id of usercard*/
			$(this).remove();

		});

	});

});

/*rightbutton.onclick*/
$(document).ready(function(){
	$("#rightbutton").click(function(){
		minusnumber();
		$('#cards li:last').animate({
			left:'150px'
		},'fast');
		$('#cards li:last').fadeOut('fast',function(){
			subtractedlist.push($(this).html()); /*record id of usercard*/
			$(this).remove();
		});
	});

});

