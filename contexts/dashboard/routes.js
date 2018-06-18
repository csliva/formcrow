var express = require('express');
var router = express.Router();
//const controller = require('./controller.js');

/* Check to see if logged in */
router.get('/', function(req, res, next) {
  if(req.session.userId){
    console.log(req.session.userId)
    res.send('Logged In');
  } else {
    return res.redirect('users/login');
  }
});

module.exports = router;
