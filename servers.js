// this file in only for making the express server and socketio server
const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));
const socketio = require('socket.io');
const expressServer = app.listen(8080); // make express server listen to port 8080
const io = socketio(expressServer); // make socketio listen to express server
const helmet = require('helmet');
app.use(helmet());
console.log('Express and socketio are listening at port 8080');

module.exports = {
    app,
    io
}

