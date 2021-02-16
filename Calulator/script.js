let calculator={
    displayValue: '0',
    firstOperator:null,
    secondOperator:false,
    operator:null,
}
function inputDigits(digit){
    let {displayValue,secondOperator}=calculator

    if(secondOperator===true){
        calculator.displayValue=digit;
        calculator.secondOperator=false;
    } else{
        calculator.displayValue=displayValue==="0"? digit : displayValue + digit;
    }
}

function inputDecimal(dot){
    if(calculator.secondOperator===true){
        calculator.displayValue="0";
        calculator.secondOperator=false;
        return
    }
    if(!calculator.displayValue.includes(dot)){
        calculator.displayValue+= dot;
    }
}

function operatorMy(nextOperator){
    const {firstOperator,displayValue,operator}=calculator
    let inputValue = parseFloat(displayValue);

    if(operator && calculator.secondOperator){
        calculator.operator=nextOperator;
        return;
    }
    if(firstOperator ===null && !isNaN(inputValue)){
        calculator.firstOperator=inputValue;
    } else if(operator){
        let result = calculate(firstOperator, inputValue, operator);
        calculator.displayValue = `${parseFloat(result.toFixed())}`;
    }
    calculator.secondOperator=true;
    calculator.operator=nextOperator;
}
function calculate(firstOperator,secondOperator,operator){
    if (operator==='+'){
        return firstOperator+secondOperator;
    }else if(operator==="-"){
        return firstOperator-secondOperator
    }else if(operator==="*"){
        return firstOperator*secondOperator
    }else if(operator==="/"){
        return firstOperator/secondOperator
    }
    return secondOperator;
}
function resetCal(){
    calculator.displayValue= '0';
    calculator.firstOperator= null;
    calculator.secondOperator=false;
    caclculate.operator=null;
}

function updateDis(){
    let display = document.querySelector('.calculatorSrceen');
    display.value = calculator.displayValue;
}
updateDis();

let keys = document.querySelector('.calculatorKeys');
keys.addEventListener('click', event => {
  const { target } = event;
  const { value } = target;
  if (!target.matches('button')) {
    return;
}

switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
        operatorMy(value);
      break;
    case '.':
      inputDecimal(value);
      break;
    case 'all-clear':
        resetCal();
      break;
    default:
      if (Number.isInteger(parseFloat(value))) {
        inputDigits(value);
      }
  }

  updateDis();
});