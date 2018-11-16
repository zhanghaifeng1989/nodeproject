/**
 * Created by zhanghaifeng on 2018/11/9.
 */
var express = require('express');
var router = express.Router();
var _= require('lodash');

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://47.105.169.181:27017/mytest';

/* Get */
/*url /cars/*/
router.get('/', function(req, res, next) {
    console.log("接受请求");
    MongoClient.connect(DB_CONN_STR, function (err, client) {
        //client参数就是连接成功之后的mongoclient(个人理解为数据库客户端)
        if (err) {
            console.log("数据库连接失败");
            return;
        }
        console.log("数据库连接成功");
        //3.0新写法
        var db = client.db("mytest");
        db.collection("user"). find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            console.log(result);
            client.close();
            res.json(result);
        });
    });
});

/*Post*/
/*url：/cars/car  */
router.post('/add', function(req, res, next) {
    console.log("收到请求");
    MongoClient.connect(DB_CONN_STR, function (err, client) {
        //client参数就是连接成功之后的mongoclient(个人理解为数据库客户端)
        if (err) {
            console.log("数据库连接失败");
            res.end("数据库连接失败");

            return;
        }
        console.log("数据库连接成功");
        //3.0新写法
        var db = client.db("mytest");
        db.collection("user").insertOne(
            {"device":req.body.device,"lon":req.body.lon,"lat":req.body.lat,"time":req.body.time,"address":req.body.address}
            , function (err, result) {
                client.close();
                console.log("数据关闭");
                res.end("success");
            })
    });
});





module.exports = router;
