const express = require('express');
const pool=require('./pool.js');
const router = express.Router();

/* GET users listing. */
router.post('/login', function(req, res, next) {
    let {uname, upwd} = req.body,
        sql='select uid,uname from book_user where uname=? and upwd=?';
        var values=[uname,upwd];
    pool.query(sql,values,(error,result)=>{
        if(error)throw error;
        if(!result.length){
            return res.send({code:201,msg:'faied'})
        }else {
            req.session.uid=result[0].uid;
            req.session.uname=result[0].uname;
            res.send({code:200,msg:result})
        }
    })
});

router.get('/session_data',function(req,res,next){
    let {uid,uname}=req.session;
    if(uid){
        res.send({code:200,msg:'success',uid,uname})
    }else{
        res.send({code:201,msg:'faied'})
    }
});


router.post('/register',function (req,res,next) {
    res.send('send');
});



module.exports = router;
