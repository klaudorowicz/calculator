

// Operate functions

const add = (...args) => {
  let result = 0;
  for (let arg of args) result += arg;
  return result;
};

const subtract = (first, ...args) => {
  let result = first;
  for (let arg of args) result -= arg;
  return result;
};

const multiply = (first, ...args) => {
  let result = first;
  let i = 1;
  for (let arg of args) {
    result *= arg;
    ++i;
  }
  if (i === 1) result *= first;
  return result;
};

const divide = (first, ...args) => {
  let result = first;
  for (let arg of args) {
    if ( arg === 0 ) {alert("OMG, You mustn't do that");
    return null;
    }
    result /= arg;
  }
  return result;
}

// In testing
const power = (base, ...exponents) => {
  let result = base;
  for (let exponent of exponents)  {
    if (exponent == undefined) return alert("Write divisive");
    result **= exponent;
  }
  return result;
}

//In testing
const remainder = (divided, divisive) => {
  let result = 0;
  if ( divisive === 0 ) return alert("OMG, You mustn't do that");
  if (divisive == undefined) return alert("Write divisive");
  return result = divided % divisive;
}

const factorial = (number) => {
  let result = 1;
  if (number < 2) {
    return result;
  } else {
    for (let i = 2; number >= i; i++) {
      result *= i;
    }
    return result;
  }
}

// Statement
const buttons = document.querySelectorAll('button');
const numbers = document.querySelectorAll('#number');
const operators = document.querySelectorAll('#operator');
const operatorsSolo = document.querySelectorAll('#operatorSolo');
const helpers = document.querySelectorAll('#helper');
const result = document.querySelector('#result');
const dot = document.querySelector('#dot');
const display = document.querySelector('#display');
const histories = document.querySelector('#histories');
let operator = 'operatorAdd';
let rememberPreviousNumber = '';
let selectOperator = null;
let resetDisplay = false;
let numAfterDecimal = 0;


function operate(firstNumber, operator, ...secondNumber) {

  firstNumber = Number(firstNumber);
  let afterDecimal1 = afterDecimal(firstNumber);
  secondNumber = Number(secondNumber);
  let afterDecimal2 = afterDecimal(secondNumber);

  afterDecimal1 > afterDecimal2 ? 
    numAfterDecimal = afterDecimal1 : 
      numAfterDecimal = afterDecimal2

  let multiplyNum = 10**numAfterDecimal;
  firstNumber = calculateToInteger(firstNumber, multiplyNum);
  secondNumber = calculateToInteger(secondNumber, multiplyNum);
  console.log(firstNumber);
  console.log(secondNumber);


  let result = 0;
  let dividedNum = 0;

  switch (true) {
    case (operator === '+'):

      dividedNum = 10**numAfterDecimal;
      result = add (firstNumber, secondNumber);
      result = calculateFromInteger(result, dividedNum);

      numAfterDecimal = 0;
      return result;

    case (operator === '-'):

      dividedNum = 10**numAfterDecimal;
      result = subtract (firstNumber, secondNumber);
      result = calculateFromInteger(result, dividedNum);
      return result;

    case (operator === '*'):

      dividedNum = 10**(2*numAfterDecimal);
      result = multiply (firstNumber, secondNumber);
      result = calculateFromInteger(result, dividedNum);
      return result;

    case (operator === '/'):
      return divide (firstNumber, secondNumber);

    case (operator === '^'):

      firstNumber = firstNumber/(10**numAfterDecimal);
      secondNumber = secondNumber/(10**numAfterDecimal);
      result = power (firstNumber, secondNumber);
      return result;

    case (operator === '%'):

      dividedNum = 10**numAfterDecimal;
      result = remainder (firstNumber, secondNumber);
      result = calculateFromInteger(result, dividedNum);
      return result;

    case (operator === '!'):
      firstNumber = firstNumber/(10**numAfterDecimal);
      return factorial (firstNumber);

    default:
      return null;
  }
}

function calculateToInteger(number, multiplyNum) {
  return number *= multiplyNum;
}

function calculateFromInteger(result, dividedNum) {
  return result /= dividedNum;
}

function afterDecimal(num) {
  if (Number.isInteger(num)) return 0;
  return num.toString().split('.')[1].length;
}


numbers.forEach((button) => 
  button.addEventListener('click', () => appendNumber(button.value))
)

operators.forEach((button) =>
  button.addEventListener('click', () => clickOperator(button.value))
)

operatorsSolo.forEach((button) =>
  button.addEventListener('click', () => clickSoloOperator(button.value))
)

result.addEventListener('click', evaluate);

dot.addEventListener('click', appendDot);

helpers.forEach((button) => 
  button.addEventListener('click', (e) => {
    if (e.target.value === "CE") clearDisplayC(display);
    if (e.target.value === "C") clearAll(display);
    if (e.target.value === "Del") delLastNumber(display);
  })
)


function appendNumber(number) {
  if (display.textContent === '0' || resetDisplay) clearDisplay(display);
  display.textContent += number;
}

function clickOperator(operator) {
  if (selectOperator !== null) evaluate();
  firstNumber = display.textContent;
  selectOperator = operator;
  histories.textContent = `${firstNumber} ${selectOperator}`;
  resetDisplay = true;
}


function evaluate() {
  if (selectOperator === null || resetDisplay) return;
  secondNumber = display.textContent;
  display.textContent = operate(firstNumber, selectOperator, secondNumber);
  histories.textContent = `${firstNumber} ${selectOperator} ${secondNumber} =`
  selectOperator = null;
}


function clickSoloOperator(operator) {
  firstNumber = display.textContent;
  selectOperator = operator;
  display.textContent = operate(firstNumber, selectOperator);
  histories.textContent = `${firstNumber} ${selectOperator} =`;
  selectOperator = null;
  resetDisplay = true;
}

function appendDot() {
  if (resetDisplay) clearDisplayC;
  if (display.textContent === '') display.textContent = '0';
  if (display.textContent.includes('.')) return;
  display.textContent += '.';
}




function removeAllChild(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  };
};


function clearDisplay(node) {
  node.textContent = '';
  resetDisplay = false;
}

function clearDisplayC(node) {
  node.textContent = '0';
  resetDisplay = false;
}

function delLastNumber(node) {
  node.textContent = node.textContent.slice(0, -1);
}


function clearAll(parent) {
  parent.textContent = '0';
  firstNumber = '';
  secondNumber = '';
  selectOperator = null;
  histories.textContent = 'history';
  resetDisplay = false;
}



