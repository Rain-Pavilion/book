const express = require('express');
const pool=require('./pool.js');
const router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
    let {uname, upwd} = req.query,
        sql='select * from book_user where uname=? and upwd=?',
        values=[uname,upwd];
    pool.query(sql,values,(error,result)=>{
        if(error)throw error;
        let info=result.length>0?{code:200,msg:'sucess'}:{code:201,msg:'faied'};
        res.send(info);
    })
});

router.post('/register',function (req,res,next) {
    res.send('send');
});



module.exports = router;
