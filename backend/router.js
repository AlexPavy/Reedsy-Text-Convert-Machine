var webappFolderName = "../client";
var db = require("./repository");
var messageService = require("./messageService.js");
var path = require('path');
var bodyParser = require('body-parser');
var filesService = require('./filesService');
var Promise = require("bluebird");

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
        Promise.all([
            db.deleteFile(req.params.id, res),
            filesService.deleteConversions(req.params.id)
        ]).then(function () {
            res.json({"message": "successfully deleted by id: " + req.params.id});
        }).catch(function(e) {
            res.json({"error": "error in deleteFile: " + e});
        });
    });
    app.put('/' + filesEndPoint + '/:id' + '/convert', function (req, res) {
        messageService.sendConvertFile(req.params.id, req.body.type);
        res.json({
            "message": "successfully queued conversion of " + req.params.id
            + " to " + req.body.type
        });
    });
}

module.exports = {
    "start": start
};