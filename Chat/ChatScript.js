
var userCount = 0;

function updateUser(username){
    document.getElementById("username").innerHTML=username;
}

function get(timestamp){
  var currentDate = new Date();
  var date = currentDate.getDate();
  var month = currentDate.getMonth() + 1; //January is 0 not 1
  var year = currentDate.getFullYear();
  const now = new Date();
  var timestamp = year+"/"+month+"/"+date+"-"+now.toLocaleTimeString();


  return timestamp;
}

function updateUser(){
  var socket = io();
  socket.on('sendUser', function(username){
    console.log("recieving: "+username);
    document.getElementById("username").innerHTML=username;
  });
}
