function postCard(id){
	this.id = id;
}

function deck(){
	this.ids = [1,2,3,4];

	var postCards = [];
	for (var i = 0; i < this.ids.length; i++){
		postCards.push(new postCard(this.ids[i]));
	}
	return postCards;
}

//TODO: add login/logout when 

var postDeck = new deck();
window.onload = function(){
	updatePosts(postDeck);
}

function updatePosts(postDeck){
	var posts = document.getElementById("commPosts");
	for (var i = 0; i < postDeck.length; i++){
		var post = document.createElement("section");
		post.setAttribute("class", "post");
		posts.append(post);

		//post title
		//TODO: switch this to "a" tag for linking to commposts later
		var title = document.createElement("h");
		var titleText = document.createTextNode("Javascript title test");
		title.appendChild(titleText);
		title.setAttribute("class", "postTitle");
		post.appendChild(title);

		//post info
		var postInfo = document.createElement("section");
		postInfo.setAttribute("class", "postInfo");
		post.appendChild(postInfo);

		//post info: date
		var today = new Date().toJSON().slice(0,10);
		var todayText = document.createTextNode("Posted: " + today.toString());

		var date = document.createElement("p");
		date.setAttribute("class", "datePosted");
		date.appendChild(todayText);
		postInfo.appendChild(date);

		//post info: author
		//TODO: set this up with login database
		var author = "John Doe";
		var authorText = document.createTextNode("Author: " + author);

		var authorTag = document.createElement("p");
		authorTag.setAttribute("class", "author");
		authorTag.appendChild(authorText);
		postInfo.appendChild(authorTag);

		//post info: num comments
		//TODO: set this up with the comment database
		var numComments = 3;
		var numCommentsText = document.createTextNode(numComments.toString() + " comments");

		var commentTag = document.createElement("p");
		commentTag.setAttribute("class", "numComments");
		commentTag.appendChild(numCommentsText);
		postInfo.appendChild(commentTag);

	}
	
}

//TODO: this should be on the backend
function addNewPost(){
	var postTitle = document.getElementById("newPostTitle").action;
	var postContents = document.getElementById("newPostText").action;
	console.log(postTitle, postContents)


	/*updatePosts(postDeck);*/
}