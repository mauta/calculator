class Calculator {
  constructor(previousOperand, currentOperand) {
    this.previousOperand = previousOperand;
    this.currentOperand = currentOperand;
    this.clear();
  }

  clear() {
    this.current = '';
    this.previous = '';
    this.operation = undefined;
  }

  appendNumber(number) {
    if (number === '.' && this.current.includes('.')) {
      return
    }
    this.current = this.current.toString() + number.toString();
  }


  updateDisplay() {
    this.currentOperand.innerText = this.getDisplayNumber(this.current);
    if(this.operation != null){
      this.previousOperand.innerText = `${this.getDisplayNumber(this.previous)} ${this.operation}`;
    }
    
  }

  chooseOperation(operation) {
    if (this.current === '') {
      return
    }
    if (this.previous !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previous = this.current;
    this.current = ''
  }

  compute() {
    let result;
    const prev = parseFloat(this.previous);
    const curt = parseFloat(this.current);
    if (isNaN(prev) || isNaN(curt)) return

    switch (this.operation) {
      case '+':
        result = prev + curt;
        console.log(result)
        break
      case '-':
        result = prev - curt;
        console.log(result)
        break
      case '*':
        result = prev * curt;
        break
      case '÷':
        result = prev / curt;
        break
      // case '&#8730;':
      //   result = Math.sqrt(prev);
      //   console.log(result)
      //   break
      case 'x n':
        result = Math.pow(prev, curt);
        console.log(result)
        break
      // case '| x |':
      //   result = Math.abs(prev);
      //   console.log(result)
      //   break
      // case '+':
      //   result = prev + curt;
      //   break
      default:
        return
    }
    this.current = result;
    this.operation = undefined;
    this.previous = '';
  }

  delete(){
    this.current = this.current.toString().slice(0,-1);
  }

  getDisplayNumber(number){
    const floatNumber = parseFloat(number);
    if(isNaN(floatNumber)){
      return '';
    }
        return floatNumber.toLocaleString('ru',{
      maximumFractionDigits:10
    });
  }

}








const numberBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');
const previousOperand = document.querySelector('[data-previous-operand]');
const currentOperand = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperand, currentOperand)

numberBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})

operationBtn.forEach(button => {
  button.addEventListener('click', () => {
    console.log(button.innerText);
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})

equalsBtn.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
})

allClearBtn.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteBtn.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})