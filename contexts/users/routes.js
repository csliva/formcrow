var express = require('express');
var router = express.Router();
const controller = require('./controller.js');

/* POST submissions listing. */
router.post('/', function(req, res, next) {
  controller.create(req, res)
});

/* Login -- sends data to /auth */
router.get('/login', function(req, res, next) {
  res.render('login');
});

/* Sign up -- render form */
router.get('/signup', function(req, res, next) {
  res.render('signup');
});
/* Sign up -- post data */
router.post('/signup', function(req, res, next) {
  controller.create(req, res)
});

/* Authenticate */
router.post('/auth', function(req, res, next) {
  controller.authenticate(req, res)
});

/* Authenticate */
router.get('/logout', function(req, res, next) {
  controller.logout(req, res)
});

module.exports = router;
