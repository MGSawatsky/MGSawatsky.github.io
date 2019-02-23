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

const userInfo = {
  username : '',
  color : "#000000",
}
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
    io.emit("userList", givenUsername);
    console.log("sending: "+username);
  });
  socket.on("userList", function(givenUsername){
    console.log("Sending for userlist");
    io.emit("userList", givenUsername);
    console.log("Sending for userlist");
  });
  //Sends message to all users with a timestamp
  socket.on('chat message', function(msg, givenUsername, givenColor){
    var timestamp = get('timestamp');
    if(msg.substring(0,10) == "/nickcolor"){
      console.log("colour");
      console.log(msg.substring(11));
      userInfo.color = "#"+msg.substring(11);
      var color = userInfo.color;
      socket.emit("sendColor", color);
      socket.on("sendColor", function(color){
        socket.emit("sendColor", color);
        console.log("sending: "+color);
      });
    }
    else if (msg.substring(0,5) == "/nick"){
      console.log("nick");
      console.log(msg.substring(6));
      username = msg.substring(6);
      socket.emit("sendUser", username);
      socket.on("sendUser", function(username){
        socket.emit("sendUser", username);
        console.log("sending: "+username);
      });
    }
      else{
        io.emit('chat message', "["+timestamp+"] "+givenUsername+": "+msg, givenUsername, givenColor);
      }
  });
});

function updateUserList(){

}
http.listen(port, function(){
  console.log('listening on *:' + port);
});
