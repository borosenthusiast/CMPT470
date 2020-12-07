var router = require('express').Router();
var path = require('path');
var file_path = "/../views/";
var multer = require('multer');
let middleware = require('../middleware.js');
var dogforadoptionController = require('../controllers/dogforadoptionController');

const account_type = {
    ADMIN: 'Admin',
    ADOPT: 'Adopt',
    USER: 'User'
};

router.get('/', function(req,res) {
	uat = req.account_type;
	if (uat === account_type.ADMIN || uat === account_type.ADOPT) {
		res.sendFile(path.join(__dirname + file_path + "newdogforadoptionpage/newdogforadoption.html"));
	}
	else {
		res.status(403).json({
			success: false,
			message: "Requires Admin or Adoption Role to have access."
		});
	}
});

router.get('/newdogforadoption.css', function(req,res){
	res.sendFile(path.join(__dirname + file_path + "newdogforadoptionpage/newdogforadoption.css"));
});

router.get('/newdogforadoption.js', function(req,res){
	res.sendFile(path.join(__dirname + file_path + "newdogforadoptionpage/newdogforadoption.js"));
});


const upload = multer({ dest: './uploads/'});

router.post('/submit',middleware.checkToken, upload.array("img"), dogforadoptionController.submitDogforadoption);


module.exports = router;
