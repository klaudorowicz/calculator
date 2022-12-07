

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
    return 0;
    }
    result /= arg;
  }
  return result;
}

// In testing
const power = (base, ...exponents) => {
  let result = base;
  for (let exponent of exponents)  {
    if (exponent == undefined) {
      alert("Write divisive");
      return 0;
    }
    result **= exponent;
  }
  return result;
}

//In testing
const remainder = (divided, divisive) => {
  let result = 0;
  if ( divisive === 0 ) {
    alert("OMG, You mustn't do that"); 
    return 0;
  }
  if (divisive == undefined) {
    alert("Write divisive");
    return 0;
  }
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
const sign = document.querySelector('#sign');
let operator = 'operatorAdd';
let rememberPreviousNumber = '';
let selectOperator = null;
let resetDisplay = false;
let numAfterDecimal = 0;
let resultOfOperation = 0;


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
  let result = num.toString().split('.')[1];
  if (result === undefined) return result = 0;
  result = result.length;
  return result;
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

sign.addEventListener('click', () => singChange(display))

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
  if (resultOfOperation !==0) firstNumber = resultOfOperation;
  resultOfOperation = 0;
  selectOperator = operator;

  let firstNumberDisplay = expo(firstNumber, 5, 11);
  histories.textContent = `${firstNumberDisplay} ${selectOperator}`;
  resetDisplay = true;
}

function evaluate() {
  if (selectOperator === null || resetDisplay) return;
  secondNumber = display.textContent;

  resultOfOperation = operate(firstNumber, selectOperator, secondNumber);
  display.textContent = resultOfOperation;
  display.textContent = expo(display.textContent, 13, 15);

  let firstNumberDisplay = expo(firstNumber, 5, 11);
  let secondNumberDisplay = expo(secondNumber, 5, 11);
  histories.textContent = 
    `${firstNumberDisplay} ${selectOperator} ${secondNumberDisplay} =`
  selectOperator = null;
}


function expo(number, expo, max) {
  let control = number.toString().length;
  if (control  > max) return Number.parseFloat(number).toExponential(expo);
  return number;
}

function clickSoloOperator(operator) {
  firstNumber = display.textContent;
  selectOperator = operator;
  display.textContent = operate(firstNumber, selectOperator);
  firstNumber = expo(firstNumber, 10);
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


function clearDisplay(node) {
  node.textContent = '';
  resetDisplay = false;
}

function clearDisplayC(node) {
  node.textContent = '0';
  resetDisplay = false;
}

function delLastNumber(node) {

  if (node.textContent.includes('-') 
    && node.textContent.length === 2) 
      return node.textContent = '0';

  if (node.textContent.length === 1) return node.textContent = '0';
  node.textContent = node.textContent.slice(0, -1);
}

function singChange(node) {

  if (node.textContent === '0') return;
  let newStr = node.textContent.split('');

  node.textContent.includes('-') ? newStr.splice(0, 1) : newStr.splice(0, 0, '-');

  newStr = newStr.join('');
  node.textContent = newStr;
}


function clearAll(parent) {
  parent.textContent = '0';
  firstNumber = '';
  secondNumber = '';
  selectOperator = null;
  histories.textContent = 'history';
  resetDisplay = false;
}

window.addEventListener('keydown', handleKeyboardInput)

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === '.' || e.key === ',') appendDot();
  if (e.key === '=' || e.key === 'Enter') evaluate();
  if ( /[+*%\/\-]/.test(e.key) ) clickOperator(e.key);
  if ( /!/.test(e.key) ) clickSoloOperator(e.key);
  if (e.key === 'Backspace') delLastNumber(display);
  if (e.key === 'Escape') clearAll(display);
  if (e.key === 'Delete') clearDisplayC(display);
}
