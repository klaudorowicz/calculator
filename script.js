

const buttons = document.querySelectorAll('button');
const numbers = document.querySelectorAll('#number');
const operators = document.querySelectorAll('#operator');
const helpers = document.querySelectorAll('#helper');
const result = document.querySelector('#result');
const display = document.querySelector('#display');
const histories = document.querySelector('#history');
let operator = 'operatorAdd';

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
    if ( arg === 0 ) return result = "OMG, You mustn't do that";
    result /= arg;
  }
  return result;
}

// In testing
const power = (base, ...exponents) => {
  let result = base;
  for (let exponent of exponents)  {
    if (exponent == undefined) return result = 'Write exponent';
    result **= exponent;
  }
  return result;
}

//In testing
const remainder = (divided, divisive) => {
  let result = 0;
  if ( divisive === 0 ) return result = "OMG, You mustn't do that";
  if (divisive == undefined) return result = 'Write divisive';
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
  }
}

let rememberPreviousNumber = '';
let selectOperator = '';
let solution = '';
let resetDisplay = false;
let lastWasOperator = false;


buttons.forEach( (button) => {
  button.addEventListener('click', (e) => {

    if (lastWasOperator) removeAllChild(display);

    if (rememberPreviousNumber && e.target.id === 'number') clickSecondNumber(e.target);
    else if (e.target.id === 'number') clickFirstNumber(e.target);

    if (e.target.id === 'operator') clickOperator(e.target);

    if (e.target.id === 'result') {
      solution = operate(firstNumber, selectOperator, secondNumber);
      afterSolution(solution);
      rememberPreviousNumber = '';
    }

    if (e.target.id === 'helper') {
      if (e.target.value === "CE") clearContent(display);
      if (e.target.value === "C") clearAll(display);
    }
  })
})

function afterSolution(solution) {
  clearAll(display);
  display.textContent = solution;
  firstNumber = solution;
}


function clickFirstNumber(number) {
  const displayText = document.createTextNode(number.value);
  display.appendChild(displayText);
  firstNumber = display.value;
  lastWasOperator = false;
}

function clickSecondNumber(number) {
  const displayText = document.createTextNode(number.value);
  display.appendChild(displayText);
  secondNumber = display.value;
  lastWasOperator = false;
}

function clickOperator(operator) {
  rememberPreviousNumber = firstNumber;
  display.textContent = operator.value;
  lastWasOperator = true;
  selectOperator = operator.value; 
}

function removeAllChild(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  };
};

function clearContent(parent) {
  parent.textContent = '';
}

function clearAll(parent) {
  parent.textContent = '';
  firstNumber = '';
  secondNumber = '';
  selectOperator = '';
}



