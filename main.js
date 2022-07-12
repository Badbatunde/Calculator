const displayButton = document.querySelector('#display');
const numberButtons = document.querySelectorAll('[data-number]');
const clearButton = document.querySelector('#clear');
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.querySelector('#equal')
const pointButton = document.querySelector ('.point')
const deleteButton = document.querySelector('#delete')
const percentButton = document.querySelector('#percentage')

let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false

window.addEventListener('keydown', handleKeyboardInput)
equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
pointButton.addEventListener('click', appendPoint)
deleteButton.addEventListener('click', deleteNumber)

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
    shouldResetScreen = true 
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
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' || e.key === '%')
    setOperation(convertOperator(e.key))
}

function convertOperator (keyboardOperator) {
    if (keyboardOperator === '/') return 'divide'
    if (keyboardOperator === '+') return 'add'
    if (keyboardOperator === '*') return 'multiply'
    if (keyboardOperator === '-') return 'subtract'
    if (keyboardOperator === '%') return 'percentage'
}

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const percentage = num => num / 100;

function divide (num1, num2) {
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
        return percentage(num2)
    }
}