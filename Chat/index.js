/*
Basic chat code based off of the Tutorial linked in assignment description
Tutorial URL: http://socket.io/get-started/chat/
*/

/*var app = require('express')();*/
var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;


// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

var htmlPath = path.join(__dirname);
app.use(express.static(htmlPath));


// var nodePath = path.join(__dirname, "node_modules/socket.io/socket.io.js");
// app.use(express.static(nodePath));

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
