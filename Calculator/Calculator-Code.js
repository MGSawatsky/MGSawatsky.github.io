
const calculator = document.querySelector('Calculator-Class');
//var display = document.getElementById('display')
const keys = calculator.querySelector('Calculator-Body');

keys.addEventListener('click', e => {
 if (e.target.matches('button')) {
   const key = e.target
   const action = key.dataset.action

   if (
     action==='add' || action==='subtract' || action==='multiply' || action==='divide'
   ) {
     console.log('key')
   }
 }
})
