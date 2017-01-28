var express = require('express');
var app = express();
var path = require('path');

var port = 8080;
var webappFolderName = "webapp";

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/' + webappFolderName + '/index.html');
});

app.listen(port, function () {
    console.log('Example app listening on port '+ port +'!')
});