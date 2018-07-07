var express = require('express');
var router = express.Router();
const controller = require('../contexts/dashboard/controller.js');

/* Check to see if logged in */
router.get('/', function(req, res, next) {
  if(req.session.userId){
    // load in dashboard data
    controller.index(req, res)
  } else {
    //Not logged in
    return res.redirect('users/login');
  }
});

router.get('/create', function(req, res, next) {
  if(req.session.userId){
    // load in dashboard data
    controller.create(req, res)
  } else {
    //Not logged in
    return res.redirect('users/login');
  }
});

/* Check to see if logged in */
router.get('/:postId', function(req, res, next) {
  if(req.session.userId){
    // load in dashboard data
    controller.single(req, res)
  } else {
    //Not logged in
    return res.redirect('users/login');
  }
});

/* Check to see if logged in */
router.get('/csv/:postId', function(req, res, next) {
  if(req.session.userId){
    // load in dashboard data
    controller.csv(req, res)
  } else {
    //Not logged in
    return res.redirect('users/login');
  }
});


module.exports = router;
