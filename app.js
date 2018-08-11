var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
const multer = require('multer')
//引入art-template 模板引擎
var template = require('art-template');

var app = express();
var form = multer();
var gulp = require('gulp');
var sass = require('gulp.sass');
 
gulp.task('sass', function () {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));

app.get('/',(req,res)=>{
  res.redirect('/index.html');
})

var DateFun = require('./lib/date');

app.get('/news/all',(req,res)=>{
	fs.readdir('news', function (errDir, dataDir) {
        if (errDir) {
            console.log('读取data目录失败');
            res.send('读取data目录失败');
        }
        else {
            /////dataDir是一个数组
            console.log(dataDir);

            /////创建一个数组变量用于保存所有的用户信息
            var arrAllNews = [];
            for (var i = 0; i < dataDir.length; i++) {
              try{
                    var temFileName = 'news/' + dataDir[i];
                    ////同步读取文件 把内容加入数组
                    ///.DS_STORE
                    //读取文件内容 同步读取
                    var fileData = fs.readFileSync(temFileName);                
                    ///把文件内容转换成object对象
                    var fileDataObj = JSON.parse(fileData);

                    /////根据当前提交留言的用户名获取用户信息
                                  
                    //////把文件内容的object数据加入数组
                    arrAllNews.push(fileDataObj);
              }
              catch(err){
                console.log(err);
              }
                
            }
            /////把数组对象格式化成json字符串进行输出    
            res.json(arrAllNews);            
        }
        // res.send('测试读取文件夹中....');
    })


})
//art-template配置 标准格式 照抄就行
app.set('views', './views');//放模板文件的目录 要写在项目根目录下 这个可以改
template.config('base', '');//指定模板默认路径
template.config('extname', '.html');//模板的后缀名 可以改
app.engine('.html', template.__express);//express的html模板引擎使用art-template
app.set('view engine', 'html');//设置使用html模板

app.get('/news', function (req, res) {
	console.log(req.query.newsTime);
	var newsTime = req.query.newsTime; 
	//面向对象开发语言中 大部分是通过.访问对象上的内容
	//php ->
	//异步读取文件
	/****
	* 文件名,回调函数
	* 回调函数包含两个参数
	* 参数1 err 错误内容 提示
	* 参数2 data 返回结果
	*/
	fs.readFile('news/' + newsTime + '.json', function (err, data) {
		if (err) {
			console.log('err!');

		}
		else {
			// res.send(data.toString());
			//格式化字符串为js对象
			var newsDetail = JSON.parse(data.toString());
			
			res.render('newsDetail',{data:newsDetail});

		}
	})

	//拼接一个文件名 同步读取文件数据 
	// var str = fs.readFileSync('data/' + name + '.json');
	// console.log(str);
	// res.send(str.toString());
})

app.use('/news',require('./routes/formidable'));
app.use('/news',require('./routes/add'));
app.use('/common/file',require('./routes/common/common'));

  var server = app.listen(3000,function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('server is running on '+host+':'+port);
});