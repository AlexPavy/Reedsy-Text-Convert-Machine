var webappFolderName = "../client";
var db = require("./repository");
var converter = require("./converter.js");
var path = require('path');

var bodyParser = require('body-parser');

var filesEndPoint = 'files';

function start(app) {
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    app.get('/', function (req, res) {
        res.sendFile(path.resolve(__dirname + '/' + webappFolderName + '/index.html'));
    });

    app.get('/' + filesEndPoint, function (req, res) {
            db.getAllFiles(res);
        });
    app.post('/' + filesEndPoint, function (req, res) {
            db.createFile(req.body.name, req.body.content, res);
        });
    app.delete('/' + filesEndPoint + '/:id', function (req, res) {
            db.deleteFile(req.params.id, res);
        });
    app.put('/' + filesEndPoint + '/:id' + '/convert', function (req, res) {
        converter.convertFile(req.params.id, req.body);
    });
}

module.exports = {
    "start": start
};