var router = require('express').Router();
var profileController = require('../controllers/profileController');

router.post('/postProfile', profileController.addProfile);

module.exports = router;