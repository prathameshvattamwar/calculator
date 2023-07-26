const display = document.getElementById('result');
const clearButton = document.getElementById('clear');
const backspaceButton = document.getElementById('backspace');
const percentButton = document.getElementById('percent');
const divideButton = document.getElementById('divide');
const multiplyButton = document.getElementById('multiply');
const subtractButton = document.getElementById('subtract');
const addButton = document.getElementById('add');
const equalsButton = document.getElementById('equals');
const decimalButton = document.getElementById('decimal');
const audio = new Audio('Button.mp3');
const copyright_audio = new Audio('copyright-prathamesh.mp3');
const buttons = document.querySelectorAll('button');

let firstOperand = null;
let secondOperand = null;
let operator = null;
let shouldResetScreen = false;

function reset() {
  display.textContent = '0';
  firstOperand = null;
  secondOperand = null;
  operator = null;
  shouldResetScreen = false;
}

function inputDigit(digit) {
  if (shouldResetScreen) {
    display.textContent = digit;
    shouldResetScreen = false;
  } else {
    display.textContent =
      display.textContent === '0' ? digit : display.textContent + digit;
  }
}

function inputDecimal(dot) {
  if (shouldResetScreen) {
    display.textContent = '0.';
    shouldResetScreen = false;
    return;
  }

  if (!display.textContent.includes(dot)) {
    display.textContent += dot;
  }
}

function backspace() {
  display.textContent = display.textContent.slice(0, -1);
  if (display.textContent.length === 0) {
    display.textContent = '0';
  }
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(display.textContent);

  if (operator && secondOperand !== null) {
    compute();
  } else {
    firstOperand = inputValue;
  }

  operator = nextOperator;
  shouldResetScreen = true;
}

function compute() {
  if (secondOperand === null) {
    secondOperand = parseFloat(display.textContent);
  }

  if (operator === '÷' && secondOperand === 0) {
    alert("You can't divide by 0!");
    reset();
    return;
  }

  let result = 0;
  switch (operator) {
    case '+':
      result = firstOperand + secondOperand;
      break;
    case '-':
      result = firstOperand - secondOperand;
      break;
    case '×':
      result = firstOperand * secondOperand;
      break;
    case '÷':
      result = firstOperand / secondOperand;
      break;
    default:
      return;
  }

  result = Math.round(result * 10000) / 10000;
  firstOperand = result;
  secondOperand = null;
  operator = null;
  display.textContent = result;
}

clearButton.addEventListener('click', () => {
  reset();
  copyright_audio.currentTime = 0;
  copyright_audio.play();
});

backspaceButton.addEventListener('click', () => {
  backspace();
  audio.currentTime = 0;
  audio.play();
});

percentButton.addEventListener('click', () => {
  display.textContent = `${parseFloat(display.textContent) / 100}`;
  audio.currentTime = 0;
  audio.play();
});

divideButton.addEventListener('click', () => {
  handleOperator('÷');
  audio.currentTime = 0;
  audio.play();
});

multiplyButton.addEventListener('click', () => {
  handleOperator('×');
  audio.currentTime = 0;
  audio.play();
});

subtractButton.addEventListener('click', () => {
  handleOperator('-');
  audio.currentTime = 0;
  audio.play();
});

addButton.addEventListener('click', () => {
  handleOperator('+');
  audio.currentTime = 0;
  audio.play();
});

equalsButton.addEventListener('click', () => {
  compute();
  audio.currentTime = 0;
  audio.play();
});

decimalButton.addEventListener('click', () => {
  inputDecimal('.');
  audio.currentTime = 0;
  audio.play();
});

for (let i = 0; i < 10; i++) {
  document.getElementById(`${i}`).addEventListener('click', () => {
    inputDigit(`${i}`);
    audio.currentTime = 0;
    audio.play();
  });
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    audio.currentTime = 0;
    audio.play();
  });
});