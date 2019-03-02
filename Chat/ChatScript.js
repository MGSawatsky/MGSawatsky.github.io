
var userCount = 0;
const userInfo = {
  username : '',
  color : "#000000",
  cookieValue: false,
}
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

function printInfo(){
  console.log("username: "+userInfo.username);
  console.log("color: "+userInfo.color);

}
function updateUser(){
  var socket = io();
  socket.on('sendUser', function(username){
    console.log("recieving: "+username);
    document.getElementById("username").innerHTML=username;
  });
}

function checkCookie(givenUsername){
  if (document.cookie.split(';').filter((item) => item.trim().startsWith('usernameCookie=')).length) {
    var tempString = "usernameCookie="+givenUsername+";";
    console.log('The cookie "usernameCookie" exists (ES6): '+tempString);
    console.log("cookie:  "+userInfo.username+givenUsername);

    document.cookie = tempString;
    // var testC = "";
    // testC = document.cookie;
    // console.log(testC);
  //     testC = testC.replace("usernameCookie=", "");
  //     console.log(testC);
  //     userInfo.username = testC;
  //     userInfo.cookieValue = true;
  //     document.getElementById("username").innerHTML=userInfo.username;
  }
  else{
  //   socket.on('sendUser', function(username){
  //     console.log("recieving2: "+username);
  //     document.getElementById("username").innerHTML=username;
  //     userInfo.username = username;
  //
      var tempString = "usernameCookie="+givenUsername+";";
      console.log(tempString);
      console.log("cookie:  "+userInfo.username+givenUsername);
      document.cookie = tempString;
  //   });
  //
  }
}
