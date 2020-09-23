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
    this.previousOperand.innerText = '';
  }

  appendNumber(number) {

    if (number === '') {
      this.current = -1 * this.current;
    } else {
      this.current = String(this.current) + number.toString();
    }
  }

  drawDot() {
    let before = 0;
    if (this.current === '') {
      this.current = before + '.';
    } else this.current = this.current + '.'
  }

  // updateDisplay() {
  //   this.currentOperand.innerText = this.current;
  //   if (this.operation === 'x n') {
  //     this.previousOperand.innerText = `${this.getDisplayNumber(this.previous)} ^ `;
  //   } else if (this.operation != null) {
  //     this.previousOperand.innerText = `${this.getDisplayNumber(this.previous)} ${this.operation}`;
  //   }
  // }

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
  }

  chooseOperation(operation) {
    if (operation === '-' && this.current === '') {
      this.current = `-`;
      this.currentOperand.innerText = '-';
      this.appendNumber();
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
    this.previous = prev;
    this.current = result;
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
    this.current = result;
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

  // getDisplayNumber(number) {
  //   console.log(number);
  //   let floatNumber
  //   const dotPosition = number.indexOf('.')
  //   const dlina = number.slice(dotPosition + 1).length;
  //   console.log(dlina)
  //   if (dotPosition != -1 && number.slice(-1) === '0') {
  //     console.log(',fkfkfkf')
  //     floatNumber = parseFloat(number).toPrecision(dlina);
  //     console.log(floatNumber)
  //   } else {
  //     floatNumber = parseFloat(number);
  //   }

  //   if (isNaN(floatNumber)) {
  //     return '';
  //   }
  //   return floatNumber.toLocaleString('ru', {
  //     maximumFractionDigits: 10
  //   });
  // }



  getDisplayNumber(number) {
    console.log(typeof(number))
       const floatNumber = parseFloat(number);
    if (isNaN(floatNumber)) {
      return '';
    }
    return floatNumber.toLocaleString('ru', {
      maximumFractionDigits: 10
    });
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

    calculator.appendNumber(button.innerText);
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