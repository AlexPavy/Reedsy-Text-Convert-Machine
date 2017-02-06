var filesService = require('./filesService');
var db = require("./repository");
var amqp = require('amqp');
var http = require("http");
var credentials = require('./../private/config').amqp;

var amqpHost = 'antelope.rmq.cloudamqp.com';
var amqpUrl = 'amqp://' + credentials.user + ':' + credentials.password + '@' + amqpHost + '/' + credentials.user;

var CONVERSION_PRIORITY = {
    html: 2,
    pdf: 1
};
var CONVERSION_TIMEOUTS = {
    html: 10,
    pdf: 100
};
var exchange;

var connection = amqp.createConnection({url: amqpUrl}, {}, function () {});

connection.on('ready', function () {
    console.log('Connection established to ' + amqpUrl);
    exchange = connection.exchange('conversion-exchange', {
            type: 'topic',
            durable: true,
            confirm: true
        },
        function (exchange) {
            console.log('Exchange ' + exchange.name + ' is open');
        });

    connection.queue('html-queue', {
        durable: true
    }, function (q) {
        console.log('Queue ' + q.name + ' is open');
        q.bind('conversion-exchange', 'html', function () {
            console.log('Queue ' + q.name + ' is bound to html');
        });
        q.subscribe(doConvertHtml);
    });

    connection.queue('pdf-queue', {
        durable: true
    }, function (q) {
        console.log('Queue ' + q.name + ' is open');
        q.bind('conversion-exchange', 'pdf', function () {
            console.log('Queue ' + q.name + ' is bound to pdf');
        });
        q.subscribe(doConvertPDF);
    });
});

connection.on('error', function (e) {
    console.log("Error from amqp: ", e);
});

function sendConvertFile(id, type) {
    exchange.publish(type, new Buffer(JSON.stringify(id)), {
        priority: CONVERSION_PRIORITY[type],
        contentType: 'application/json'
    }, function () {
        console.log("sendConvertFile successful : " + id)
    });
}

function doConvertHtml(id) {
    setTimeout(function () {
        db.getFile(id, function (err, file) {
            filesService.createHTMLConversion(id, file, function (err) {
                db.updateFile(id, "Done", null).then(function () {
                    console.log("Finished converting file : " + id + " to html")
                })
            });
        });
    }, CONVERSION_TIMEOUTS['html'] * 1000);
}

function doConvertPDF(id) {
    setTimeout(function () {
        db.getFile(id, function (err, file) {
            filesService.createPDFConversion(id, file, function (err) {
                db.updateFile(id, null, "Done").then(function () {
                    console.log("Finished converting file : " + id + " to pdf")
                })
            });
        });
    }, CONVERSION_TIMEOUTS['pdf'] * 1000);
}

module.exports = {
    "sendConvertFile": sendConvertFile
};