var express = require('express');
var app = express();
var router = require("./backend/router");
var notificationService = require("./backend/notificationService");
var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Text convert machine backend listening on port '+ port +'!')
});
// app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname));

router.start(app);
notificationService.start(app);