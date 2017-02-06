var http = require('http');
var websocket_port = 8081;
var websocket;

function start(app) {
    var httpServer = http.createServer(app);
    httpServer.listen(websocket_port);
    var socket_io = require('socket.io')(httpServer);
    socket_io.on('connection', function (socket) {
        websocket = socket;
        console.log('Client is connected : ' + socket.id);
    });
}

function emitConversionFinished(id, type) {
    websocket.emit("conversion_finished" + "_" + type, id);
}

module.exports = {
    "start": start,
    "emitConversionFinished" : emitConversionFinished
};