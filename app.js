var express = require('express');
var app = express();
app.use(express.bodyParser());
var mongoose = require('mongoose');
var querystring = require('querystring');
mongoose.connect('mongodb://127.0.0.1/logger');
var Tracker = mongoose.model('Logger', {
  'time': Number,
  'from': String,
  'msg': String,
  'url': String,
  'line': String,
  'type': String,
  'userAgent': String
});

app.get('/_.gif', function(req, res) {
  var url = req.originalUrl;
  var start = url.indexOf('?');
  var search = url.slice(start + 1);
  //console.log(search);
  var data = querystring.parse(search);
  console.log(data.from);
  console.log(data.msg);
  var name = req.query.name;
  var one = new Tracker({
    time: +new Date(),
    from: data.from,
    msg: data.msg,
    url: data.url,
    line: data.line,
    type: data.type,
    userAgent: req.headers['user-agent']
  });

  // 插入记录
  one.save(function(err) {
    if (err) {
      console.log('err found');
    } // ...
    //console.log('成功记录');
    res.send(204);
  });

});

// 数据接口
app.get('/api/data.json', function(req, res) {

  Tracker.find({}).limit(100).exec(function(err, data) {
    res.send({
      error: 0,
      rows: data
    });
  });
});

app.listen(8001);
console.log('server is running at port 8001');