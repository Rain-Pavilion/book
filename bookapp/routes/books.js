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
    let keyword = req.query.keyword,
        sql = `SELECT * FROM book_laptop WHERE (book_name LIKE "%${keyword}%") or(author like 
    "%${keyword}%"
)
`;
    pool.query(sql, function (error, result) {
        if (error) throw error;
        res.send(result);
    })
});


module.exports = router;
