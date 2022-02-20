let firstOperand = " ";
let secondOperand = " ";
let currentOperation= null;
let doResetScreen = false;

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-clear]");
const decimalButton = document.querySelector("[data-decimal]");
const previousOperationScreen = document.querySelector("[data-previous-screen]");
const currentOperationScreen = document.querySelector("[data-current-screen]");

equalsButton.addEventListener('click', compute);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);
decimalButton.addEventListener('click', appendDecimal);

numberButtons.forEach((button => 
    button.addEventListener('click', () => appendNumber(button.textContent)))
);

operationButtons.forEach((button => 
    button.addEventListener('click', () => chooseOperation(button.textContent)))
);

function appendNumber(number) {
    if (currentOperationScreen.textContent === "0" || doResetScreen)
    resetScreen();
    if (currentOperationScreen.textContent.length === 15) return;
    currentOperationScreen.textContent += number;
}

function resetScreen() {
    currentOperationScreen.textContent = " ";
    doResetScreen = false;
}

function clear() {
    currentOperationScreen.textContent = "0";
    previousOperationScreen.textContent = "";
    firstOperand = " ";
    secondOperand = " ";
    currentOperation = null;
}

function appendDecimal() {
    if (doResetScreen) resetScreen();
    if (currentOperationScreen.textContent === " ")
    currentOperationScreen.textContent = "0";
    if (currentOperationScreen.textContent.includes(".")) return;
    currentOperationScreen.textContent += ".";
}

function deleteNumber () {
    currentOperationScreen.textContent = currentOperationScreen.textContent.toString().slice(0, -1);
}

function chooseOperation(operation) {
    if (currentOperation !== null) compute();
    firstOperand = currentOperationScreen.textContent;
    currentOperation = operation;
    previousOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
    doResetScreen = true;
}

function compute() {
    if (currentOperation === null || doResetScreen) return;
    if(currentOperation === "÷" && currentOperationScreen.textContent === "0") {
        alert("You cannot divide by 0!!!");
        return;
    }

    secondOperand = currentOperationScreen.textContent;
    currentOperationScreen.textContent = roundResult(
        operate(currentOperation, firstOperand, secondOperand)
    );
    previousOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
    currentOperation = null;
}

function roundResult(number) {
    return Math.round(number * 100) / 100;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operation, a, b) {
    a = Number (a);
    b = Number(b);
    switch(operation) {
        case "+":
            return add(a, b);
            break;
        case "-":
            return subtract(a, b);
            break;
        case "✕":
            return multiply(a, b);
            break;
            case "÷":
                if (b === 0) return null;
                else return divide(a, b);
        default:
            return null;
    }
}

