var router = require('express').Router();
var profileController = require('../controllers/profileController');

router.post('/createprofile', profileController.addProfile);
router.post('/createpetprofile', profileController.addPetProfile);

module.exports = router;