var express = require('express');
var router = express.Router();
var fs = require('fs');

var multer = require('multer');
var form = multer();

/* post 注册页面 page. */
router.post('/add', function (req, res) {
    //   res.render('index', { title: 'Express' });

    
    var newsTitle = req.body.newsTitle;
    var newsIntro = req.body.newsIntro;
    var newsDetail = req.body.newsDetail;
    var newsImg = req.body.ImgUrls; ////头像路径
    var obj = {};
    var now = new Date();
    var newsTime = now.getTime();
    // var DateFun = require('../lib/date');
    // var date = new DateFun();
    obj.newsTitle = newsTitle;
    obj.newsIntro = newsIntro;
    obj.newsDetail = newsDetail;
    obj.newsImg = newsImg;
    obj.newsTime = newsTime;

    var file = './news/' + newsTime + '.json';
    fs.writeFile(file, JSON.stringify(obj));

    res.redirect('/list.html');

});

module.exports = router;
