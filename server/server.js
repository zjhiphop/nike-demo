var express = require('express');
var multer  = require('multer');
var DB  = require('./db/database');
var InfoModel  = require('./db/info-model');

DB.connect();

var app = express();
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

    data.file_path = '/uploads/' + req.files.files.name;

    InfoModel.save(data);

    res.send('提交成功');
}]);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Nike App listening at http://%s:%s', host, port);
});