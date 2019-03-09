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
var cookieParser = require('cookie-parser');

const userInfo = {
  username : '',
  color : "#000000",
}

var savedUsername;
var listOfUsers = '';
var messageList= '';
var lastUser='';

function getTime(timestamp){
  var currentDate = new Date();
  var date = currentDate.getDate();
  var month = currentDate.getMonth() + 1; //January is 0 not 1
  var year = currentDate.getFullYear();
  const now = new Date();
  var timestamp = year+"/"+month+"/"+date+"-"+now.toLocaleTimeString();


  return timestamp;
}

/*
Based off function from w3schools for getting the value of a cookie from the cookie string
Tutorial URL: https://www.w3schools.com/js/js_cookies.asp
*/
function getCookie(cookieDoc) {
  var name = "usernameCookie=";
  var decodedCookie = decodeURIComponent(cookieDoc);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


var htmlPath = path.join(__dirname);
// app.use(express.static(htmlPath));
app.use(cookieParser());

app.get('/list', function(req, res){
  res.send(req.cookies);
});
app.get('/', function(req, res){
  if(req.cookies['cookieUsername']){
    savedUsername = req.cookies['cookieUsername'];
    console.log('Cookie already exists. Value: ' + req.cookies['cookieUsername']);
  }
  else{
    savedUsername = "USER"+userCount;
    userCount = userCount+1;
    res.cookie('cookieUsername', savedUsername);
    console.log("creating cookie " + savedUsername);
  }
  app.use(express.static(htmlPath));
  res.sendFile(__dirname + '/index.html');
});


//socket.username instead of username


io.on('connection', function(socket){

  //method of assigning username on sign in
  socket.username = savedUsername;
  socket.emit("sendUser", socket.username);
  listOfUsers = String(listOfUsers+socket.username+"<br>");
  io.emit("userList", listOfUsers);
  console.log("list of users2:  " + listOfUsers);


  //sends current message board
  socket.emit("sendMessageBoard", messageList);

  //Sends message to all users with a timestamp
  socket.on('chat message', function(msg, givenUsername, givenColor){
    var timestamp = getTime('timestamp');
    var username = '';
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
        socket.username = username;
        listOfUsers = listOfUsers.replace(givenUsername, socket.username);
        socket.emit("sendUser", socket.username);
        socket.on("sendUser", function(username){
          socket.emit("sendUser", username);
          console.log("sending: "+username);
        });
      }
      io.emit("userList", listOfUsers);
    }
      else{
        var completeMsg = "<font color=#707070>["+timestamp+"]</font> "+givenUsername+": "+msg;
        io.emit('chat message', "<font color=#707070>["+timestamp+"]</font> "+givenUsername+": <fontcolor="+givenColor+">"+msg+"</font>", givenUsername, givenColor, timestamp);
        messageList = messageList.concat('<li>' + completeMsg);
      }
  });
  socket.on('disconnect', function(){
    console.log('disconnect2: '+ socket.username);
      listOfUsers = listOfUsers.replace(socket.username+'<br>', '');
      io.emit("userList", listOfUsers);
      var disconnectMsg = "User: " + socket.username +" has disconnected.";
      io.emit('chat message', disconnectMsg);
      console.log('disconnect');
  });
});



http.listen(port, function(){
  console.log('listening on *:' + port);
});
