var fs = require('fs');
var filesDir = "./client/converted-files";
var htmlFilesDir = filesDir + "/html";
var db = require("./repository");
var mkdirp = require('mkdirp');
var amqp = require('amqplib/callback_api');
var credentials = require('./../private/config').amqp;
var amqpHost = 'antelope.rmq.cloudamqp.com';

amqp.connect('amqp://' + credentials.user + ':' + credentials.password + '@' + amqpHost + '/' + credentials.user,
    function (err, conn) {});

function convertFile(id, config) {
    db.getFile(id, function (err, file) {
        var fileName = id + ".html";
        mkdirp(htmlFilesDir, function (err) {
        });
        fs.writeFile(htmlFilesDir + '/' + fileName, file.content, function (err) {
        });
    });
}

module.exports = {
    "convertFile": convertFile
};