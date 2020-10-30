class Calculator {
  constructor(previousOperand, currentOperand) {
    this.previousOperand = previousOperand;
    this.currentOperand = currentOperand;
    this.readyToReset = false;
    this.clear();
  }

  clear() {
    this.current = '';
    this.previous = '';
    this.operation = undefined;
    this.previousOperand.innerText = '';
  }

  appendNumber(number) {
  
    this.current = this.current.toString() + number.toString();

   
  }

  drawDot() {
    let before = 0;
    if (this.current.includes('.')) return;
    if (this.current === '') {
      this.current = before + '.';
    } else if (this.current === '-') {
      this.current = '-' + before + '.';
    } else this.current = this.current + '.'
  }



  updateDisplay() {
    this.currentOperand.innerText = this.getDisplayNumber(this.current);
    if (this.operation === 'x n') {
      this.previousOperand.innerText = `${this.getDisplayNumber(this.previous)} ^ `;
    } else if (this.operation != null) {
      this.previousOperand.innerText = `${this.getDisplayNumber(this.previous)} ${this.operation}`;
    }
  }



  updateDisplayEqual() {
    if (this.current !== this.current) {
      this.currentOperand.innerText = 'ЭТО НЕВОЗМОЖНО';
    } else {
      this.currentOperand.innerText = this.getDisplayNumber(this.current);
      this.previousOperand.innerText = ``;
    }
    this.previous = '';
  }

  chooseOperation(operation) {
    if (operation === '-' && this.current === '') {
      this.current = `-`;
      this.currentOperand.innerText = '-';
    }

    if (operation === 'ln' || operation === '√' || operation === '| x |') {
      this.computeOne();
    }

    if (this.previous !== '') {
      this.computeTwo();
    }

    this.operation = operation;
    this.previous = this.current;
    this.current = ''
  }

  computeOne() {
    let result;
    const prev = parseFloat(this.previous);
    switch (this.operation) {
      case 'ln':
        result = Math.log(prev);
        break
      case '√':
        result = Math.sqrt(prev);
        break
      case '| x |':
        result = Math.abs(prev);
        break
      default:
        return
    }
    this.readyToReset = true;
    this.previous = prev;
    this.current = parseFloat(result.toFixed(10));
    this.operation = undefined;
  }

  computeTwo() {
    let result;
    const prev = parseFloat(this.previous);
    const curt = parseFloat(this.current);
    if (isNaN(prev) || isNaN(curt)) return

    switch (this.operation) {
      case '+':
        result = prev + curt;
        break
      case '-':
        result = prev - curt;
        break
      case '*':
        result = prev * curt;
        break
      case '÷':
        result = prev / curt;
        break
      case 'x n':
        result = Math.pow(prev, curt);
        break
      default:
        return
    }
    this.readyToReset = true;
    this.current = parseFloat(result.toFixed(10));
    this.operation = undefined;
    this.previous = '';
  }

  delete() {
    if (this.current === '') {
      this.clear()
    } else {
      this.current = this.current.toString().slice(0, -1);
    }

  }


  getDisplayNumber(number) {
    if (number === '-') return number;

    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('ru', {
        maximumFractionDigits: 10
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay},${decimalDigits}`;
    } else {
      return integerDisplay.toLocaleString('ru', {
        maximumFractionDigits: 10
      });
    }
  }



  compute() {
    (this.operation === '√' || this.operation === '| x |' || this.operation === 'ln') ? this.computeOne(): this.computeTwo()

  }

}

const numberBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const dotBtn = document.querySelector('[data-dot]');
const allClearBtn = document.querySelector('[data-all-clear]');
const previousOperand = document.querySelector('[data-previous-operand]');
const currentOperand = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperand, currentOperand)

numberBtn.forEach(button => {
  button.addEventListener('click', () => {
    if (calculator.previous === "" &&
      calculator.current !== "" &&
      calculator.readyToReset) { 
      calculator.current = "";
      calculator.readyToReset = false;
    }
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay();
  })
})




dotBtn.addEventListener('click', button => {
  calculator.drawDot();
  calculator.updateDisplay();
})


operationBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    if (button.innerText === '√' || button.innerText === '| x |' || button.innerText === 'ln') {
      calculator.compute();
      calculator.updateDisplayEqual();
    } else {
      calculator.updateDisplay();
    }

  })
})

equalsBtn.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplayEqual();
})

allClearBtn.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteBtn.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})