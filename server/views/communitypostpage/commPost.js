function commentCard(id){
    this.id = id;
}

function deck(){
    this.ids = [1,2,3,4];

    var commentCards = [];
    for (var i = 0; i < this.ids.length; i++){
        commentCards.push(new commentCard(this.ids[i]))
    }
    return commentCards;
}

var commentDeck = new deck();
window.onload = function(){
    updateComments(commentDeck);
}

function updateComments(commentDeck){
    var allComments = document.getElementById("allComments");
    for (var i = 0; i < commentDeck.length; i++){
        var comment = document.createElement("div");
        comment.setAttribute("class", "comment")
        allComments.append(comment)

        //comment info (author and date)
        var commentInfo = document.createElement("section");
        commentInfo.setAttribute("class", "commentInfo");
        comment.appendChild(commentInfo);

        //comment info: author
        //TODO: set this up with the login database
        var author = "Jon Doe";
        var authorText = document.createTextNode(author);

        var authorTag = document.createElement("p");
        authorTag.setAttribute("class", "author");
        authorTag.appendChild(authorText);
        commentInfo.appendChild(authorTag);

        //comment info: date
        var today = new Date().toJSON().slice(0,10);
        var todayText = document.createTextNode(today.toString());
        
        var date = document.createElement("p");
        date.setAttribute("class", "dateCommented");
        date.appendChild(todayText);
        commentInfo.appendChild(date);

        //comment content
        //TODO: set this up with mongo
        var content = "This is a javascript test comment";
        var contentText = document.createTextNode(content);

        var contentTag = document.createElement("p");
        contentTag.setAttribute("class", "content");
        contentTag.appendChild(contentText);
        comment.appendChild(contentTag);
    }

}