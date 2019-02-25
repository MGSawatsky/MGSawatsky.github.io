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
var listOfUsers = '';
var messageList= '';
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


  //method of assigning username on sign in
  socket.emit("sendUser", username);
  socket.on("sendUser", function(username){
    console.log("list of users4:  " + listOfUsers);
    socket.emit("sendUser", username);
    io.emit("userList", username);
    console.log("list of users1:  " + listOfUsers);
    console.log("sending: "+username);
  });
  //Sends list of users online
  listOfUsers = String(listOfUsers+username+"<br>");
  io.emit("userList", listOfUsers);
  console.log("list of users2:  " + listOfUsers);

  //sends current message board
  socket.emit("sendMessageBoard", messageList);

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
      console.log(msg.substring(6));
      username = msg.substring(6);
      if(listOfUsers.includes(username)){
        console.log('username taken');
      }
      else{
        listOfUsers = listOfUsers.replace(givenUsername, username);
        socket.emit("sendUser", username);
        socket.on("sendUser", function(username){
          socket.emit("sendUser", username);
          console.log("sending: "+username);
        });
      }
      io.emit("userList", listOfUsers);
    }
      else{
        var completeMsg = "<font color=#707070>["+timestamp+"]</font> "+givenUsername+": "+msg;
        io.emit('chat message', "<font color=#707070>["+timestamp+"]</font> "+givenUsername+": "+msg, givenUsername, givenColor);
        messageList = messageList.concat('<li>' + completeMsg);
      }
  });
  socket.on('disconnect', function(socket, usernameDis){
    console.log('disconnect2: '+ usernameDis);
      listOfUsers = listOfUsers.replace(usernameDis+'<br>', '');
      console.log('disconnect');
  });
  socket.on('disconnectMsg', function(socket, usernameDis){
    console.log('usernameDis: '+ usernameDis);
      listOfUsers = listOfUsers.replace(usernameDis+'<br>', '');
      console.log('usernameDis');
  });
});



http.listen(port, function(){
  console.log('listening on *:' + port);
});
