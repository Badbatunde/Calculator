const displayButton = document.querySelector('#display');
const numberButtons = document.querySelectorAll('[data-number]');
const clearButton = document.querySelector('#clear');
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.querySelector('#equal')
/* const lastOpScreen = document.getElementById('lastOpScreen')
const currentOpScreen = document.getElementById('currentOpScreen') */
const pointButton = document.querySelector ('.point')

let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false

window.addEventListener('keydown', handleKeyboardInput)
equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
pointButton.addEventListener('click', appendPoint)

numberButtons.forEach((button) => 
    button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) => 
    button.addEventListener('click', () => setOperation(button.id))
)

function appendNumber (number) {
    if (displayButton.textContent === '0' || shouldResetScreen)
        resetScreen()
        displayButton.textContent += number
        clearButton.textContent = 'C'
}

function resetScreen () {
    displayButton.textContent = ''
    shouldResetScreen = false
}

function clear () {
    clearButton.innerHTML = 'AC'
    displayButton.textContent = '0'
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
}

function appendPoint () {
    if (shouldResetScreen) resetScreen()
    if (displayButton.textContent === '')
    displayButton.textContent = '0'
    if (displayButton.textContent.includes('.')) return
    displayButton.textContent += '.'
}

function deleteNumber () {
    displayButton.textContent = displayButton.textContent
        .toString()
        .slice(0, -1)
}

function setOperation (operator) {
    if (currentOperation !== null) evaluate ()
    firstOperand = displayButton.textContent
    currentOperation = operator
    // displayButton.textContent = `${firstOperand} ${currentOperation}`
    shouldResetScreen = true
}

function evaluate () {
    if (currentOperation === null || shouldResetScreen) return
    if (currentOperation === 'divide' && displayButton.textContent === '0') {
        displayButton.textContent = '...error!'
        return
    }
    secondOperand = displayButton.textContent
    displayButton.textContent = roundResult (
        operate(currentOperation, firstOperand, secondOperand)
    )
    // displayButton.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null
}

function roundResult (number) {
    return Math.round (number * 1000) / 1000
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') appendPoint()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteNumber()
    if (e.key === 'Escape') clear ()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    setOperation(convertOperator(e.key))
}

function convertOperator (keyboardOperator) {
    if (keyboardOperator === '/') return 'divide'
    if (keyboardOperator === '+') return 'add'
    if (keyboardOperator === '*') return 'multiply'
    if (keyboardOperator === '-') return 'subtract'

}

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;

function divide (num1, num2) {
    if (num2 === 0) {
        return '...err!';
    }
    return Math.round((num1 / num2) * 1000000) / 1000000;
}

const multiply = (num1, num2) => num1 * num2;

const operate = (operator, num1, num2) => {
    num1 = Number(num1)
    num2 = Number(num2)
    if (operator === 'add') {
        return add(num1, num2);
    } else if (operator === 'subtract') {
        return subtract(num1, num2);
    } else if (operator === 'divide') {
        return divide(num1, num2);
    } else if (operator === 'multiply') {
        return multiply(num1, num2);
    } else if (operator === 'percentage') {
        return percentage(num1, num2)
    }
}

console.log(operate('add', 1, 2))

// Basic maths function for the calculator
/* const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;

function divide (num1, num2) {
    if (num2 === 0) {
        return '...err!';
    }
    return Math.round((num1 / num2) * 1000000) / 1000000;
}

const multiply = (num1, num2) => num1 * num2;
const percentage = num1 => num1 / 100;

// Function that calls operation on number pairs.
const operate = (operator, num1, num2) => {
    if (operator === 'add') {
        return add(num1, num2);
    } else if (operator === 'subtract') {
        return subtract(num1, num2);
    } else if (operator === 'divide') {
        return divide(num1, num2);
    } else if (operator === 'multiply') {
        return multiply(num1, num2);
    } else if (operator === 'percentage') {
        return percentage(num1, num2)
    }
}

let firstValue = 0;
let secondValue;
let solution;
let operator;

clear.addEventListener('click', function() {
    clear.textContent = 'AC';
    firstValue = [];
    secondValue = 0;
    solution = 0;
    display.textContent = '';
})

numbers.forEach((number) => {
    number.addEventListener('click', function () {
        display.textContent += number.textContent;
        if (firstValue === 0) {
            firstValue = Number(display.textContent); 
        } else secondValue = Number(display.textContent);
        clear.textContent = 'C';
    })
})

operators.forEach((element) => {
    element.addEventListener('click', function () {
        operator = element.id;
        display.textContent = '';
    })
})

equal.addEventListener('click', function () {
    solution = operate(operator, firstValue, secondValue);
    display.textContent = solution;
}) */




