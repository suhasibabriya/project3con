var express = require('express');
var router = express.Router();
var user = require("../usercontroller/usercontroller")

router.post('/', user.register);
router.post('/login', user.login);
router.get('/', user.viewData);
router.get('/logout', user.logout);


module.exports = router;