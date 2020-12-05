var router = require('express').Router();
var dogforadoptionController = require('../controllers/dogforadoptionController');

router.post('/createdogforadoption', dogforadoptionController.addDogforadoption);
router.get('/getAlldogs', dogforadoptionController.getAlldogs);
router.post('/loadDog', dogforadoptionController.loadDog);


module.exports = router;