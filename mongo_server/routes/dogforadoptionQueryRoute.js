var router = require('express').Router();
var dogforadoptionController = require('../controllers/dogforadoptionController');

router.post('/createdogforadoption', dogforadoptionController.addDogforadoption);

module.exports = router;