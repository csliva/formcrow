var express = require('express');
var router = express.Router();
const controller = require('../contexts/dashboard/controller.js');

/* Check to see if logged in */
router.get('/', function(req, res, next) {
  if(req.session.userId){
    // load in dashboard data
    controller.load(req, res)
  } else {
    //Not logged in
    return res.redirect('users/login');
  }
});

module.exports = router;
