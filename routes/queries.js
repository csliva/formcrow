var express = require('express');
var router = express.Router();
const controller = require('../contexts/queries/controller.js');

/* User creates new query */
router.post('/', function(req, res, next) {
  controller.create(req, res)
  //res.send('respond with a resource');
});

module.exports = router;
