var express = require('express');
var app = express();
var router = require("./backend/router");
var notificationService = require("./backend/notificationService");

var port = 8080;

app.listen(port, function () {
    console.log('Text convert machine backend listening on port '+ port +'!')
});
app.use(express.static(__dirname + '/client'));

router.start(app);
notificationService.start(app);