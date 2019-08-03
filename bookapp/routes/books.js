var express = require('express');
const pool=require('./pool.js');
const router = express.Router();

/* GET users listing. */
router.get('/query', function(req, res, next) {
   let lid=req.query.lid,
       sql='select * from book_laptop where lid=?',
       values=[lid];
   pool.query(sql,values,function (error,result) {
     if(error)throw error;
     res.send(result);
   })
});



module.exports = router;
