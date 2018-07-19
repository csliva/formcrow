var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.userId){
    res.redirect("/dashboard")
  } else {
    res.render('index', { title: 'Form Crow', authed: false, subscribed: true});
  }
});

/* GET home page. */
router.get('/contact-us', function(req, res, next) {
  let authed = req.session.userId ? true : false
  var subscribed = req.session.userSubbed ? true : false;
  res.render('contact', { authed: authed, subscribed: subscribed});
});

module.exports = router;
