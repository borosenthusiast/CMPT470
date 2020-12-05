var router = require('express').Router();
var matchedusersController = require('../controllers/matchedusersController');

router.post('/newmessage', matchedusersController.addnewmessage);
router.post('/loadMessages', matchedusersController.loadMessages);

module.exports = router;