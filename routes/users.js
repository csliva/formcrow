var express = require('express');
var router = express.Router();
const controller = require('../contexts/users/controller.js');

/* POST submissions listing. */
router.post('/', function(req, res, next) {
  controller.create(req, res)
});

/* Login -- sends data to /auth */
router.get('/login', function(req, res, next) {
  if(!req.session.userId){
    res.render('login');
  } else { return res.redirect('/dashboard'); }
});

/* Authenticate */
router.post('/login', function(req, res, next) {
  controller.authenticate(req, res)
});


/* Sign up -- render form */
router.get('/signup', function(req, res, next) {
  if(!req.session.userId){
    res.render('signup');
  } else { return res.redirect('/dashboard'); }
});
/* Sign up -- post data */
router.post('/signup', function(req, res, next) {
  controller.create(req, res)
});

/* Log out */
router.get('/logout', function(req, res, next) {
  controller.logout(req, res)
});

module.exports = router;
