var express = require('express');
var pool=require('./pool');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hello');
});

module.exports = router;
