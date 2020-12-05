var router = require('express').Router();
var profileController = require('../controllers/profileController');

router.post('/createprofile', profileController.addProfile);

router.post('/createpetprofile', profileController.addPetProfile);

router.get('/getprofilebyid/:id', profileController.getProfileById);

router.post('/updateprofile/:id', profileController.updateProfile);

module.exports = router;