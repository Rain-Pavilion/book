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



//用户评论
router.get('/queryComment',function(req,res){
    let lid = req.query.lid;
    let sql = "select comment,uname,product_id from book_comment left join book_user on book_comment.user_id=book_user.uid where product_id=?;";
    pool.query(sql,[lid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send(result)
        }
    })
})


router.get('/comment',function(req,res){
    let lid = req.query.lid;
    let text = req.query.text;
    let uid = req.session.uid;
    let sql=`insert into book_comment (user_id,product_id,comment) values (${uid},${lid},'${text}')`;
    console.log(sql)
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0)
        {
        res.send({code:200,msg:"success"})
        }
    })
})


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

router.get('/logout',function (req,res,next) {
    req.session.uid='';
    req.session.uname='';
    res.send({code:200,msg:'success'})
});

module.exports = router;
