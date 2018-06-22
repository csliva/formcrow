var express = require('express');
var router = express.Router();
const controller = require('../contexts/emails/controller.js');

router.get('/', function(req, res, next) {
  controller.send(req, res);
});

module.exports = router;
