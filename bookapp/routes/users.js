const express = require('express');
const pool=require('./pool.js');
const router = express.Router();

/* GET users listing. */
router.post('/login', function(req, res, next) {
    let {uname, upwd} = req.body,
        sql='select * from book_user where uname=? and upwd=?',
        values=[uname,upwd];
    pool.query(sql,values,(error,result)=>{
        if(error)throw error;
        if(!result.length){
            return res.send({code:201,msg:'faied'})
        }else {
            res.send({code:200,msg:'success'})
        }
    })
});

router.post('/register',function (req,res,next) {
    res.send('send');
});



module.exports = router;
