
const calculator = {
  currentDisplay: '0',
  currentString: "0",
  firstPress: true,
};

const buttons = document.querySelector('.Calculator-Body');

function updateDisplay(){
  const display = document.querySelector('.Calculator-Display');
  display.value = calculator.currentDisplay;
}

updateDisplay();

function numberFunction(number){
  //Makes it function as you would normally expect
  if(calculator.firstPress){
    calculator.currentString = number;
    calculator.firstPress=false;
  }
  else{
    calculator.currentString += number;
  }
  calculator.currentDisplay = calculator.currentString;
  updateDisplay();
}

function clearFunction(){
  calculator.currentString ="0";
  calculator.currentDisplay = '0';
  calculator.firstPress = true;
  updateDisplay();
}

function equalsFunction(){
  try{
    calculator.currentDisplay = eval(calculator.currentString);
    console.log(calculator.currentDisplay);
    if(calculator.currentDisplay=='NaN' || calculator.currentDisplay=="undefined" ||  calculator.currentDisplay=="Infinity" || calculator.currentDisplay=="function Error() { [native code] }"){
      throw "err";
    }
  }
  catch(err){
    calculator.currentDisplay = "Error";
    calculator.currentString = '0';
    calculator.firstPress = true;
  }
  updateDisplay();
  calculator.currentString = calculator.currentDisplay;
}

buttons.addEventListener('click', (event) => {
  const {target} = event;

  if(!target.matches('button')){
    console.log("not clicking a button")
    return;
  }
  else if(target.classList.contains('clear')){
    //do clear function
    clearFunction();
  }
  else if(target.classList.contains('equals')){
    //do equals function
    equalsFunction();
  }
  else{
    numberFunction(target.value);
    //must be a number
  }
})
