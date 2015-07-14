var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Info = new Schema({
    "account": String,
    "address": String,
    "birthday": String,
    "contact": String,
    "fb-hour": String,
    "fb-minute": String,
    "fb-second": String,
    "fb-name": String,
    "fb-number": String,
    "files": String,
    "fn-hour": String,
    "fn-minute": String,
    "fn-second": String,
    "fn-name": String,
    "fn-number": String,
    "gender": String,
    "hb-hour": String,
    "hb-minute": String,
    "hb-second": String,
    "hb-name": String,
    "hb-number": String,
    "hn-hour": String,
    "hn-minute": String,
    "hn-second": String,
    "hn-name": String,
    "hn-number": String,
    "id-number": String,
    "file_path": String
});

module.exports = Info;