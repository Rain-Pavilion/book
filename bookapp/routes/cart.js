var express = require('express');
const pool = require('./pool.js');
const router = express.Router();

/* GET users listing. */
router.get('/queryCart', function (req, res, next) {
    let user_id =req.session.uid,
        values = [user_id],
        sql = `select price,title,sm_pic,count,iid from book_shoppingcart_item LEFT JOIN book_laptop on lid=product_id where user_id=?
 `;
    pool.query(sql, values, function (error, result) {
        if (error) throw error;
        res.send(result);
    })
});


router.get('/removeCart', function (req, res, next) {
    var iid = req.query.iid;
    var sql = 'DELETE FROM book_shoppingcart_item WHERE iid=? ',
        values = [iid];
        pool.query(sql,values,function (error, result) {
            if(error)throw error;
            if(result.affectedRows>0){
                res.send({code:200,msg:'删除成功'})
            }else{
                res.send({code:201,msg:'删除失败'})
            }
        })
    }
);


router.get('/addCart', function (req, res, next) {
    let lid = req.query.lid,
        uid = req.session.uid;
    obj = {
        user_id: uid,
        product_id: lid,
        count: 1,
    };
    let valuesjoin = [obj],
        sqlJoin = 'insert into book_shoppingcart_item set ?',
        valueshas = [obj.user_id, obj.product_id],
        sqlHas = 'select iid from book_shoppingcart_item where user_id=? and product_id=?';
    pool.query(sqlHas, valueshas, (error, result) => {
        if (result.length > 0) {
            let sql = 'update book_shoppingcart_item set count=count+1 where iid=?',
                values = [result[0].iid];
            pool.query(sql, values, (error, result) => {
                if (error) throw error;
                if (result.affectedRows > 0) {
                    res.send({code: 200, msg: '商品数量+1'})
                } else {
                    res.send({code: 201, msg: '商品添加失败'})
                }

            })
        } else {
            pool.query(sqlJoin, valuesjoin, function (error, result) {
                if (error) throw error;
                let info = result.affectedRows > 0 ? {code: 200, msg: '商品添加成功'} : {code: 201, msg: '商品添加失败'};
                res.send(info);
            })
        }
    });


});

module.exports = router;
