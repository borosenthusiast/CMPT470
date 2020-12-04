var CommunityPost = require('../models/communityPost.js');

exports.submitCommunityPost = async (req, res) => {
    var communityPost = new Communitypost({
        userId: req.decoded.id,
        postTitle = req.body.postTitle,
        postContent = req.body.postContent
        //comments should be empty upon submitting post
    });

    try {
        let status = await CommunityPost.create(communityPost);
        if (status.success) {
            console.log("Community post created");
            res.status(200).json({
                success: true,
                message: "Community post created"
            });
        } else {
            console.log("Community post creation failed");
            req.status(200).json({
                success: false,
                message: "Community post creation failed"
            });
        }
    } catch (err) {
        console.log("Error with communityPostController.submitCommunityPost");
        console.log(err);
        res.status(500).json({
            error: err,
            message: "Community post creation failed"
        });
    }
}