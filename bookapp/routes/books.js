var express = require('express');
const pool = require('./pool.js');
const router = express.Router();
/* GET users listing. */
router.get('/query', function (req, res, next) {
    let lid = req.query.lid,
        sql = 'select * from book_laptop where lid=?',
        values = [lid];
    pool.query(sql, values, function (error, result) {
        if (error) throw error;
        res.send(result);
    })
});
// 分会场
router.get("/carousel",(req,res)=>{
    let cid = req.query.cid,
    sql = "select * from book_index_carousel where cid=?";
    pool.query(sql,[cid],function(err,result){
        if (err) throw err;
        res.send(result)
    })
})

router.get('/cquery', function (req, res, next) {
    let {conditions, num} = req.query;
    console.log(conditions, num);
    let values = [conditions, parseInt(num)],
        sql = 'select * from book_laptop order by ? desc limit ?';
    pool.query(sql, values, function (error, result) {
        if (error) throw error;
        res.send(result);
    })
});

router.get('/search', function (req, res, next) {
    let keyword = req.query.keyword;
    var pno = req.query.pno;
    var ps  = 10;
    if(!pno){
        pno = 1;
      }
      pno = (pno-1)*ps;//起始记录数 ?
      ps = parseInt(ps);
   pool.query(`SELECT * FROM book_laptop WHERE (book_name LIKE "%${keyword}%") or(author like 
        "%${keyword}%") or(title like 
            "%${keyword}%")`,function (error, result) {
        if (error) throw error;
        var pnos=Math.ceil(result.length/10);
        sql = `SELECT * FROM book_laptop WHERE (book_name LIKE "%${keyword}%") or(author like 
            "%${keyword}%") or(title like 
                "%${keyword}%") LIMIT ?,?
                `;
        pool.query(sql,[pno,ps],function (error, result) {
            if (error) throw error;
            // result=result.push(pnos);
            result={data:result,pnos:pnos}
            console.log(result)
            res.send(result);
        })
    })
   
});


module.exports = router;
