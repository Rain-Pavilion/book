var express = require('express');
const pool=require('./pool.js');
const router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
    let {uname,upwd}=req.query;
});

module.exports = router;
