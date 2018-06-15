var express = require('express');
var router = express.Router();
const controller = require('../contexts/submissions/controller.js');

/* GET submissions listing. */
router.post('/', function(req, res, next) {
  controller.create(req, res)
  //res.send('respond with a resource');
});

/* GET submissions listing. */
router.get('/all', function(req, res, next) {
  controller.findAll(req, res)
});

module.exports = router;
