var express = require('express');
var app = express();
var router = require("./backend/router");

var port = 8080;

app.listen(port, function () {
    console.log('Example app listening on port '+ port +'!')
});
app.use(express.static(__dirname + '/client'));

router.start(app);