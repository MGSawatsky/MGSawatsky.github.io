
const calculator = {
  currentDisplay: '0',
  currentString: "0",
  firstPress: true,
  expressionString: "",
};

const buttons = document.querySelector('.Calculator-Body');

function updateDisplay(){
  const display = document.querySelector('.Calculator-Display');
  display.value = calculator.currentDisplay;
}

updateDisplay();

function updateExpressionDisplay(){
  const display = document.querySelector('.Display-Box');
  display.value = calculator.expressionString;
}

function generalFunction(number){
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
function deleteFunction(){
  calculator.currentString = calculator.currentString.slice(0, -1);
  calculator.currentDisplay = calculator.currentString;
  updateDisplay();
}
function equalsFunction(){
  try{
    calculator.currentDisplay = eval(calculator.currentString);
    console.log(calculator.currentDisplay);
    //Makes an error message you can get look better. 
    if(calculator.currentDisplay=="function Error() { [native code] }"){
      throw "err";
    }
  }
  catch(err){
    calculator.currentDisplay = "Error";
    calculator.currentString = '0';
    calculator.firstPress = true;
  }
  updateDisplay();
  calculator.expressionString = calculator.currentString + "=" + calculator.currentDisplay;
  updateExpressionDisplay();
  calculator.currentString = calculator.currentDisplay;
}

buttons.addEventListener('click', (event) => {
  const {target} = event;

  if(!target.matches('button')){
    return;
  }
  else if(target.classList.contains('clear')){
    //resets calculator
    clearFunction();
  }
  else if(target.classList.contains('equals')){
    //attempts to evaluate the expression
    equalsFunction();
  }
  else if(target.classList.contains('delete')){
    deleteFunction();
  }
  else{
    //general function for building an expression
    generalFunction(target.value);
  }
})
