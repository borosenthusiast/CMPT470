var fileHandler = require('../fileHandler.js');
var User = require('../models/user.js');
const account_type = {
	ADMIN: 'Admin',
	ADOPT: 'Adopt',
	USER: 'User'
};

exports.viewProfile = async (req, res) => {
    role = req.account_type;
    userid = req.uid;
    target_page_id = req.tid;

    if (typeof role === "undefined" || typeof userid === "undefined" || typeof target_page_id === "undefined") {
        console.log("invalid viewprofile input parameters");
        res.status(400).json({
            status: false,
            message: 'Invalid input parameters',
            mode: 'view'
        });
    }

    if (role == account_type.ADMIN) {
        // Give the admin page anyways
        console.log("Sending admin page");
        user = User.getUserbyId(userid);
        res.status(200).json({
            status: true,
            user: user,
            mode: 'edit'
        });
    }
    else if (userid = target_page_id) {
        // Give the user management (admin) page for the user
        console.log("Sending User management page");
        user = User.getUserbyId(userid);
        res.status(200).json({
            status: true,
            user: user,
            mode: 'edit'
        });
    }
    else {
        // Give the generic page
        console.log("sending public page");
        user = User.getUserbyId(userid);
        res.status(200).json({
            status: true,
            user: user,
            mode: 'view'
        });
    }

    res.sendFile(path.join(__dirname + file_path + "viewprofilepage/viewprofile.html"));
}