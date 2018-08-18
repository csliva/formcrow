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
    res.render('login', {authed: false, subscribed: false});
  } else { return res.redirect('/dashboard'); }
});

/* Authenticate */
router.post('/login', function(req, res, next) {
  controller.authenticate(req, res)
});


/* Sign up -- render form */
router.get('/signup', function(req, res, next) {
  if(!req.session.userId){
    res.render('signup', {authed: false, subscribed: true, sessionFlash: res.locals.sessionFlash});
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

/* Settings page -- Get and post */
router.get('/settings', function(req, res, next){
  controller.getSettings(req, res)
});

/* Settings page -- Get and post */
router.post('/settings', function(req, res, next){
  controller.setSettings(req, res)
});


/* GET Forgot password page  */
router.get('/forgot', function(req, res, next){
  controller.getForgot(req, res)
});

/* POST Settings page */
router.post('/forgot', function(req, res, next){
  controller.postForgot(req, res)
});

/* GET Forgot password page  */
router.get('/recover', function(req, res, next){
  controller.getRecover(req, res)
});

/* POST Settings page */
router.post('/recover', function(req, res, next){
  controller.postRecover(req, res)
});

/* GET Forgot password page  */
router.get('/upgrade', function(req, res, next){
  controller.getUpgrade(req, res)
});

/* POST Settings page */
router.post('/upgrade', function(req, res, next){
  controller.postUpgrade(req, res)
});


module.exports = router;
