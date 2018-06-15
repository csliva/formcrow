var express = require('express');
var router = express.Router();
const submissionsController = require('../controllers/submissions.controller.js');

/* GET submissions listing. */
router.post('/', function(req, res, next) {
  submissionsController.create(req, res)
  //res.send('respond with a resource');
});

/* GET submissions listing. */
router.get('/all', function(req, res, next) {
  submissionsController.findAll(req, res)
});

module.exports = router;
