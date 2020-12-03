var fileHandler = require('../fileHandler.js');
var Profile = require('../models/viewprofile.js');

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
            message: 'Invalid input parameters'
        });
    }

    if (role == account_type.ADMIN) {
        // Give the admin page anyways
        console.log("Sending admin page");
    }
    else if (userid = target_page_id) {
        // Give the user management (admin) page for the user
        console.log("Sending User management page");
    }
    else {
        // Give the generic page
        console.log("sending public page");
    }
}