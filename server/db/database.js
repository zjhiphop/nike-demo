var mongoose = require('mongoose');
var options = {
    server: {
        auto_reconnect: true,
        poolSize: 10
    }
};

module.exports = {
    connect: function() {
        mongoose.connect('mongodb://localhost/test', options);

        var db = mongoose.connection;

        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function (callback) {
            console.log('DB connected.')
        });

        return db;
    }
};

