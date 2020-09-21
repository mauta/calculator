class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.readyToReset = false;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  // delete() {
  //   this.currentOperand = this.currentOperand.toString().slice(0, -1);
  // }

  appendNumber(number) {
    this.currentOperand = number;
  }

  // chooseOperation(operation) {
  //   if (this.currentOperand === '') return;
  //   if (this.previousOperand !== '' && this.previousOperand !== '') {
  //     this.compute();
  //   }
  //   this.operation = operation;
  //   this.previousOperand = this.currentOperand;
  //   this.currentOperand = '';
  // }

  // compute() {
  //   let computation;
  //   const prev = parseFloat(this.previousOperand);
  //   const current = parseFloat(this.currentOperand);
  //   if (isNaN(prev) || isNaN(current)) return;
  //   switch (this.operation) {
  //     case '+':
  //       computation = prev + current;
  //       break
  //     case '-':
  //       computation = prev - current;
  //       break
  //     case '*':
  //       computation = prev * current;
  //       break
  //     case '÷':
  //       computation = prev / current;
  //       break
  //     default:
  //       return;
  //   }
  //   this.readyToReset = true;
  //   this.currentOperand = computation;
  //   this.operation = undefined;
  //   this.previousOperand = '';
  // }

  // getDisplayNumber(number) {
  //   const stringNumber = number.toString()
  //   const integerDigits = parseFloat(stringNumber.split('.')[0])
  //   const decimalDigits = stringNumber.split('.')[1]
  //   let integerDisplay
  //   if (isNaN(integerDigits)) {
  //     integerDisplay = ''
  //   } else {
  //     integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
  //   }
  //   if (decimalDigits != null) {
  //     return `${integerDisplay}.${decimalDigits}`
  //   } else {
  //     return integerDisplay
  //   }
  // }

  updateDisplay() {
    this.currentOperandTextElement.innerText =this.currentOperand;
 
}
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
calculator.appendNumber(button.innerText);
calculator.updateDisplay()
  })
})

