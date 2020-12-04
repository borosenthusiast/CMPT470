var axios = require("axios");

var CommunityPost = function(communityPost) {
    this.userId = communityPost.userId;
    this.postTitle = communityPost.postTitle;
    this.postContent = communityPost.postContent;
    this.postComments = communityPost.postComments;
}

CommunityPost.create = async (communityPost) => {
    let response = await axios.post('url goes here', communityPost);
    console.log(response.data);
    return response.data;
}

module.exports = CommunityPost;