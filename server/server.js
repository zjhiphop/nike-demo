var express = require('express');
var multer  = require('multer');
var DB  = require('./db/database');
var InfoModel  = require('./db/info-model');

DB.connect();

var app = express();
var trans = {
    "account": "账户"
    ,"address": "地址"
    ,"birthday": "生日"
    ,"contact": "联系方式"
    ,"id-number": "身份证号"
    ,"gender": "性别"
    ,"file_path": "截图"
    ,"fb-hour": "全程最佳(时)"
    ,"fb-minute": "全程最佳(分)"
    ,"fb-name": "全程最佳(名称)"
    ,"fb-number": "全程最佳(号码)"
    ,"fb-second": "全程最佳(秒)"
    ,"fn-hour": "全程最近(时)"
    ,"fn-minute": "全程最近(分)"
    ,"fn-number": "全程最近(号码)"
    ,"fn-name": "全程最近(秒)"
    ,"fn-second": "全程最近(秒)"
    ,"hb-hour": "半程最佳(时)"
    ,"hb-minute": "半程最佳(分)"
    ,"hb-number": "半程最佳(号码)"
    ,"hb-second": "半程最佳(秒)"
    ,"hn-hour": "全程最近(时)"
    ,"hn-minute": "全程最近(分)"
    ,"hn-number": "全程最近(号码)"
    ,"hn-second": "全程最近(秒)"
};

app.set('views', './views');
app.set('view engine', 'jade');

var upload = multer({
    dest: 'public/uploads/',
    rename: function (fieldname, filename, req, res) {
        return req.body['id-number'];
    },
    onFileUploadComplete: function (file, req, res) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
    }
});

// serve static file
app.use(express.static('public'));

app.get('/list', function(req, res, next) {
    InfoModel.find({}, function(data) {
        res.send(data);
    });
});

app.get('/show/list', function(req, res, next) {

    InfoModel.find({}, function(data) {
        var tplData =  data.map(function(item) {
            var result = {};
            var o = JSON.parse(JSON.stringify(item));

            Object.keys(o).forEach(function(idx) {
               if(idx.indexOf('_') !== 0 ) {
                    result[idx] = o[idx];
               }
            });

            return result;
        });

        var renderData = {
            list: [],
            heads: []
        };

        Object.keys(trans).forEach(function(key) {
            renderData.heads.push(trans[key]);
        });

        tplData.forEach(function(item) {
            var d = [];

            Object.keys(trans).forEach(function(key) {
                d.push(item[key] || '');
            });

            renderData.list.push(d);
        });

        res.render('result', {
            data: renderData
        });
    });
});


app.get('/upload/:id', function(req, res, next) {
    InfoModel.find({'id-number': req.params.id}, function(data) {
        res.set('Content-Type', 'text/html');

        res.send(new Buffer('<img src="' + (data[0] || {}).file_path + '">'));
    });
});

// save form data
app.post('/', [upload, function(req, res, next) {
    console.log(req.body);
    console.log(req.files);

    var data = JSON.parse(JSON.stringify(req.body));

    if(req.files.files) {
        data.file_path = '/uploads/' + req.files.files.name;
    }

    InfoModel.save(data);

    res.set('Content-Type', 'text/html');

    res.sendfile('public/success.html')
}]);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Nike App listening at http://%s:%s', host, port);
});