
var userCount = 0;

function updateUser(){
    var username = document.getElementById("username").innerHTML="USER"+userCount;
    userCount = userCount+1;
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
