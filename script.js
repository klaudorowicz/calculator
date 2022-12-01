

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

let firstNumber = 10;
let secondNumber = 4;
let operator = 'operatorAdd';


function operate(firstNumber, secondNumber, operator) {
  switch (true) {
    case (operator === 'operatorAdd'):
      return add (firstNumber, secondNumber);
      break;
    case (operator === 'operatorSubtract'):
      return subtract (firstNumber, secondNumber);
      break;
    case (operator === 'operatorMultiply'):
      return multiply (firstNumber, secondNumber);
      break;
    case (operator === 'operatorDivide'):
      return divide (firstNumber, secondNumber);
      break;
    case (operator === 'operatorPower'):
      return power (firstNumber, secondNumber);
      break;
    case (operator === 'operatorRemainder'):
      return remainder (firstNumber, secondNumber);
      break;
    case (operator === 'operatorFactorial'):
      return factorial (firstNumber);
      break;
  }
}
