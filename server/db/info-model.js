var mongoose = require('mongoose');
var infoSchema = require('./info-schema');
var InFo = mongoose.model('info', infoSchema);

module.exports = {
    save: function(data, cb) {
        var instance = new InFo(data);

        return instance.save(function() {
            console.log('document saved. id number is:', data['id-number']);
        });
    },
    find: function(cond, cb) {
        InFo.find(cond, function (err, data) {
            if (err) return console.error(err);

            console.log('[data]: ', data);

            cb(data);
        });
    }
};