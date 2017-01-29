var webappFolderName = "../client";
var db = require("./repository");
var path = require('path');

var filesEndPoint = 'files';

function start(app) {
    app.get('/', function (req, res) {
        res.sendFile(path.resolve(__dirname + '/' + webappFolderName + '/index.html'));
    });

    app.get('/' + filesEndPoint, function (req, res) {
        res.json(db.getAllFiles());
    });

    app.post('/' + filesEndPoint, function (req) {
        db.createFile(req.body.name)
    });
}

module.exports = {
    "start" : start
};