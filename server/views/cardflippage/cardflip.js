

/*after DB setup, pull 10-15 user profiles to put in array, insert as cards to html page*/
/*for now, 4 demo cards*/

/*keeping record of swiped left and right profiles*/
var addedlist = [];
var matchlist = [];
var subtractedlist = [];

function card(data){
	this.userId = data.userId;
	this.username = data.username;
	this.profile_img = data.profile_img; 
}


function builddeck(data){
	var randomusers = data;
    var cards = [];

    for (var i = 0; i < randomusers.length; i++){
    	cards.push(new card(randomusers[i]));
    }

    return cards;
}


window.onload = function(){
	$.ajax({
        url: "/cardflip/getcards",
        type: "GET",
        headers: {"Authorization": localStorage.getItem('token')},
        error : function(err) {
            console.log('Error!', err)
        },
        success: function(data) {

        	var carddeck = builddeck(data);
        	console.log("img is: " + carddeck[0].profile_img.path);

        	var deckSection = document.getElementById("cards");
        	for (var i = 0; i < carddeck.length; i++){
				var cardSection = document.createElement("section");		
				deckSection.appendChild(cardSection);
				cardSection.setAttribute("class", "card");
				cardSection.setAttribute("id", carddeck[i].userId);

				var imgSection = document.createElement("section");
				cardSection.appendChild(imgSection);
				imgSection.setAttribute("class", "profileImage");

				var img = document.createElement("img");
				imgSection.appendChild(img);
				img.setAttribute("class", "image");
				//img.src = "";
		

				var username = document.createElement("p");
				cardSection.appendChild(username);
				username.setAttribute("class", "username");

				username.innerHTML = carddeck[i].username;

			}


			document.getElementById("totalcards").innerHTML = "/" + carddeck.length;
			document.getElementById("flipsleft").innerHTML = carddeck.length;
        },
        cache: false,
        contentType: false,
        processData: false
    });


}

function minusnumber(){
	var flipsleft = parseInt(document.getElementById("flipsleft").innerHTML,10);
	if (flipsleft == 0){
		//redirect to match page


		return;
	}
	flipsleft--;
	document.getElementById("flipsleft").innerHTML = flipsleft;

}

/*leftbutton.onclick*/
$(document).ready(function(){
	$("#leftbutton").click(function(){
		minusnumber(addedlist);
		$('#cards .card:last').animate({
			right:'150px'
		},'fast');
		$('#cards .card:last').fadeOut('fast',function(){
			$(this).remove();
		});

	});

});

/*rightbutton.onclick*/
$(document).ready(function(){
	$("#rightbutton").click(function(){
	
		var id = document.getElementById("cards").lastElementChild.id;
		pushtoaddedlist(id);
		checkifmatch(id);			
	});

});


function checkifmatch(id){
	const reqData = {
		addedId: id
	};

	$.ajaxSetup({
		headers: {"Authorization": localStorage.getItem('token')}
	});
	$.post("/cardflip/checkifmatch", reqData, function(result){
		//if true, ask to send message
		if (result == true){
			var cardOnTop = document.getElementById("cards").lastElementChild;

			var alert = document.createElement("p");
			alert.setAttribute("class", "alert");
			alert.innerHTML = "MATCH!";
			cardOnTop.appendChild(alert);

			var messageButton = document.createElement("button");
			messageButton.setAttribute("class", "messageButton");
			messageButton.innerHTML = "SEND MESSAGE";
			cardOnTop.appendChild(messageButton);

			var continueButton = document.createElement("button");
			continueButton.setAttribute("class", "continueButton");
			continueButton.innerHTML = "CONTINUE SWIPING";
			cardOnTop.appendChild(continueButton);
		} 
		//else, flip card
		else {
			$('#cards .card:last').animate({
				left:'150px'
			},'fast');
			
			$('#cards .card:last').fadeOut('fast',function(){
				console.log(this.id);
				$(this).remove();
			});
			minusnumber();
			
		}
		


	});
}

$(document).ready(function(){
	$(document).on('click', '.messageButton', function() {
		console.log("send message!");
		//redirect to matchpage with current card info
		var cardOnTop = document.getElementById("cards").lastElementChild;

		const reqData = {
			chosenId: cardOnTop.id
		};

		$.ajaxSetup({
			headers: {"Authorization": localStorage.getItem('token')}
		});
		$.post("/cardflip/chosenIdpriority", reqData, function(result){
			console.log(result);
		});

   /* $.redirect(http://localhost/test/test1.php,
        {
            user_name: "khan",
            city : "Meerut",
            country : "country"
        });
    });*/
		//window.location.href = "/";


	});
});

$(document).ready(function(){
	$(document).on('click', '.continueButton', function() {
		$('#cards .card:last').animate({
			left:'150px'
		},'fast');
			
		$('#cards .card:last').fadeOut('fast',function(){
			console.log(this.id);
			$(this).remove();
		});
		minusnumber();
	});
});


function pushtoaddedlist(id){
		const reqData = {
			addedId: id
		};

		$.ajaxSetup({
			headers: {"Authorization": localStorage.getItem('token')}
		});
		$.post("/cardflip/pushtoaddedlist", reqData, function(result){
			console.log(result);
		});

}



$(document).ready(function(){
	$(document).on('mouseover', '.messageButton', function() {
		var cardOnTop = document.getElementById("cards").lastElementChild;
		cardOnTop.style.backgroundColor = "#e8c054";
	});
});

$(document).ready(function(){
	$(document).on('mouseout', '.messageButton', function() {
		var cardOnTop = document.getElementById("cards").lastElementChild;
		cardOnTop.style.backgroundColor = "#D3D1CC";
	});
});

$(document).ready(function(){
	$(document).on('mouseover', '.continueButton', function() {
		var cardOnTop = document.getElementById("cards").lastElementChild;
		cardOnTop.style.backgroundColor = "#e8c054";
	});
})

$(document).ready(function(){
	$(document).on('mouseout', '.continueButton', function() {
		var cardOnTop = document.getElementById("cards").lastElementChild;
		cardOnTop.style.backgroundColor = "#D3D1CC";
	});
})

