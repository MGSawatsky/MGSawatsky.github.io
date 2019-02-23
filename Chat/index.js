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
var timestamp = new Date().getTime();
var userCount = 0;
// var username = "";
// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

var htmlPath = path.join(__dirname);
app.use(express.static(htmlPath));

function get(timestamp){
  var currentDate = new Date();
  var date = currentDate.getDate();
  var month = currentDate.getMonth() + 1; //January is 0 not 1
  var year = currentDate.getFullYear();
  const now = new Date();
  var timestamp = year+"/"+month+"/"+date+"-"+now.toLocaleTimeString();


  return timestamp;
}
// var nodePath = path.join(__dirname, "node_modules/socket.io/socket.io.js");
// app.use(express.static(nodePath));

io.on('connection', function(socket){
  username = "USER"+userCount;
  console.log("USER"+userCount + "::" + username);
  userCount = userCount+1;
  socket.emit("sendUser", username);
  socket.on("sendUser", function(username){
    socket.emit("sendUser", username);
    console.log("sending: "+username);
  });
  //Sends message to all users with a timestamp
  socket.on('chat message', function(msg){
    console.log("chat");
    var timestamp = get('timestamp');
    io.emit('chat message', "["+timestamp+"] "+msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
