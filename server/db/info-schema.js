var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Info = new Schema({
    "account": String,
    "address": String,
    "birthday": String,
    "contact": String,
    "fb-hour": String,
    "fb-minute": String,
    "fb-number": String,
    "fb-second": String,
    "files": String,
    "fn-hour": String,
    "fn-minute": String,
    "fn-number": String,
    "fn-second": String,
    "gender": String,
    "hb-hour": String,
    "hb-minute": String,
    "hb-number": String,
    "hb-second": String,
    "hn-hour": String,
    "hn-minute": String,
    "hn-number": String,
    "hn-second": String,
    "id-number": String,
    "file_path": String
});

module.exports = Info;