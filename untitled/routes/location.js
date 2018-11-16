var express = require('express');
var router = express.Router();
var _= require('lodash');

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://47.105.169.181:27017/mytest';


// var products=[];
// products.push({name:"ZTE U880",price:899.8});
// products.push({name:"HuWei 荣耀8",price:1899.8});
// products.push({name:"iPhone 7 Plus 128G",price:5899.8});

// /* 产品 */
router.get('/', function(req, res, next) {
    //将product视图与指定的对象渲染后输出到客户端
    res.render('location', { title: 'location' });
});
//
// /* 产品 */
// router.get('/rest', function(req, res, next) {
//     res.json(products);
// });
//
// //获得产品根据Id
// //router.get('/:id/:category',function(request,res,next){
// //res.send(request.params.id+","+request.params.category);
// //});
//
// router.get('/edit/:index', function(req, res, next) {
//     var pdt=products[parseInt(req.params.index)];
//     res.render('product', { title: '天狗商城', pdts:products,msg:"",obj:pdt});
// });
//
// router.get('/:id',function(request,res,next){
//     res.send("name:"+request.query.name);
// });
//
router.post('/add',function(request,res,next){


    MongoClient.connect(DB_CONN_STR, function (err, client) {
        //client参数就是连接成功之后的mongoclient(个人理解为数据库客户端)
        if (err) {
            console.log("数据库连接失败");
            return;
        }
        console.log("数据库连接成功");
        //3.0新写法
        var db = client.db("mytest");
        db.collection("user").insertOne(
            {"device":request.body.device,"lon":request.body.lon,"lat":request.body.lat,"time":request.body.time,"address":request.body.address}
        , function (err, result) {
                client.close();
        })
    });

    res.render('location', { title: 'location' });

});
module.exports = router;
