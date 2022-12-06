

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
const helpers = document.querySelectorAll('#helper');
const result = document.querySelector('#result');
const display = document.querySelector('#display');
const histories = document.querySelector('#histories');
let operator = 'operatorAdd';
let rememberPreviousNumber = '';
let selectOperator = null;
let resetDisplay = false;


function operate(firstNumber, operator, secondNumber) {
  firstNumber = Number(firstNumber);
  secondNumber = Number(secondNumber);
  switch (true) {
    case (operator === '+'):
      return add (firstNumber, secondNumber);
    case (operator === '-'):
      return subtract (firstNumber, secondNumber);
    case (operator === '*'):
      return multiply (firstNumber, secondNumber);
    case (operator === '/'):
      return divide (firstNumber, secondNumber);
    case (operator === '^'):
      return power (firstNumber, secondNumber);
    case (operator === '%'):
      return remainder (firstNumber, secondNumber);
    case (operator === '!'):
      return factorial (firstNumber);
    default:
      return null;
  }
}


numbers.forEach((button) => 
  button.addEventListener('click', () => appendNumber(button.value))
)

operators.forEach((button) =>
  button.addEventListener('click', () => clickOperator(button.value))
)

result.addEventListener('click', evaluate)

helpers.forEach((button) => 
  button.addEventListener('click', (e) => {
    if (e.target.value === "CE") clearDisplayC(display);
    if (e.target.value === "C") clearAll(display);
  })
)


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


function appendNumber(number) {
  if (display.textContent === '0' || resetDisplay) clearDisplay(display);
  display.textContent += number;
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


function clearAll(parent) {
  parent.textContent = '0';
  firstNumber = '';
  secondNumber = '';
  selectOperator = null;
  histories.textContent = 'history';
  resetDisplay = false;
}



