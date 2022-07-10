function add (num1, num2) {
    return num1 + num2;
}

console.log(add(2,2));

function subtract(num1, num2) {
    return num1 - num2;
}

console.log (subtract(1,2))

function divide (num1, num2) {
    return Math.round((num1 / num2) * 1000000) / 1000000;
}

console.log(divide(4,3))

function multiply (num1, num2) {
    return num1 * num2;
}

console.log(multiply(4,2))

function operate (num1, num2, operation) {
    return operation(num1, num2)
}

console.log(operate(2, 3, multiply))