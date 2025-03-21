var express = require('express');
var router = express.Router();
// var user = require("../controller/usercontroller")
var user = require("../usercontroller/usercontroller")

//  GET home page. 
router.post('/add', user.addcontact);
 router.get('/', user.viewcontact);
 router.post('/update/:id', user.update);
 router.get('/delete/:id', user.delete);


module.exports = router;