/*
Some code based off of the Tutorial linked in assignment description
Tutorial URL: http://socket.io/get-started/chat/
*/

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/Chat.html');
});
/*
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
io.emit('some event', { for: 'everyone' });
*/
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(req, res){
  console.log('listening on *:3000');
});
