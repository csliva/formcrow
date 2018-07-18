var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/why-formcrow', function(req, res, next) {
    let authed = req.session.userId ? true : false;
    res.render('why.ejs', { authed: authed});
});

module.exports = router;
