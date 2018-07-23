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

/* Settings page -- Get and Set */
router.get('/settings', function(req, res, next){
  controller.getSettings(req, res)
});

/* Settings page -- Get and Set */
router.post('/settings', function(req, res, next){
  controller.setSettings(req, res)
});

module.exports = router;
