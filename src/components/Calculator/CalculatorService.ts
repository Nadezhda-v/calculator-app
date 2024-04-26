import { action, makeObservable, observable } from 'mobx';
import * as math from 'mathjs';

export class CalculatorService {
  constructor() {
    makeObservable(this, {
      previousOperand: observable,
      currentOperand: observable,
      setPreviousOperand: action,
      setCurrentOperand: action,
      deleateDigit: action,
      calcResult: action,
      appendToCurrentOperand: action,
    });
  }

  previousOperand = '';

  currentOperand = '';

  lastInput = { value: '', type: '' };

  prevResult = '';

  setPreviousOperand(previousOperand: string) {
    this.previousOperand = previousOperand;
  }

  setCurrentOperand(currentOperand: string) {
    this.currentOperand = currentOperand;
  }

  setLastInput(value: string, type: string) {
    this.lastInput = { value, type };
  }

  appendToCurrentOperand(value: string, type: string) {
    if (this.lastInput.value.includes('.') && value === '.') return;

    if (type === 'operationButton' && value !== '.' && value !== '%') {
      this.setLastInput(value, type);
    }

    const shouldAddSpace =
      this.previousOperand === '' ||
      value === '%' ||
      this.lastInput.value.includes('.') ||
      (this.lastInput.type === 'digitButton' &&
        (type === 'digitButton' || value === '.'));

    this.previousOperand += shouldAddSpace ? value : ` ${value}`;
    const lastValue = this.previousOperand.split(' ').pop() || '';

    this.lastInput.value = lastValue;

    if (
      !this.lastInput.value.includes('%') &&
      !this.lastInput.value.includes('.')
    ) {
      this.setLastInput(lastValue, type);
    }
  }

  deleateDigit() {
    const prevOperand = this.previousOperand.slice(-2, -1);
    const count = prevOperand !== ' ' ? -1 : -2;

    this.previousOperand = this.previousOperand.slice(0, count);
    this.lastInput.value = this.previousOperand.slice(-1);

    this.lastInput.type = Number.isNaN(parseFloat(this.lastInput.value))
      ? 'operationButton'
      : 'digitButton';

    this.calcResult();
  }

  calcResult() {
    // Разбиваем строку по пробелам
    const operands = this.previousOperand.split(' ');

    const isLastTwoOperator = this.isLastTwoOperators();

    /* Если меньше трех операндов или меньше 4 операндов и последние два значения
    арифметические операторы, то currentOperand должен быть установлен в пустую строку */
    if (operands.length < 3 || (operands.length < 4 && isLastTwoOperator)) {
      this.currentOperand = '';

      return;
    }

    // Если последнее значение оператор отображаем предыдущий результат вычисления
    if (this.lastInput.type === 'operationButton') {
      this.currentOperand = this.prevResult;

      return;
    }

    // Поиск символа '/' в массиве operands
    const operatorDivision = operands.indexOf('/');

    // Проверяем, если оператор равен '/' и правый операнд равен нулю
    if (
      operatorDivision !== -1 &&
      parseFloat(operands[operatorDivision + 1]) === 0
    ) {
      this.currentOperand = 'На 0 делить нельзя';

      return;
    }

    try {
      this.currentOperand = math.evaluate(this.previousOperand).toString();
      this.prevResult = this.currentOperand;
    } catch (error) {
      this.currentOperand = 'Ошибка';
    }
  }

  // Проверка являются ли два последних значения арифметическими операторами
  isLastTwoOperators(): boolean {
    const operators = ['+', '-', '*', '/'];
    const lastTwoValues = this.previousOperand.split(' ').slice(-2);

    return lastTwoValues.every((value) => operators.includes(value));
  }

  calculation(value: string, type: string) {
    if (
      this.previousOperand === '' &&
      (value === '*' || value === '/' || value === '%')
    )
      return;

    if (this.lastInput.type === 'operationButton') {
      if (this.lastInput.value === value) return;

      if (
        type === 'operationButton' &&
        value !== '-' &&
        value !== '.' &&
        !this.lastInput.value.includes('%')
      ) {
        const isLastTwoOperators = this.isLastTwoOperators();

        if (isLastTwoOperators) {
          this.setPreviousOperand(this.previousOperand.slice(0, -4));
        } else {
          this.setPreviousOperand(this.previousOperand.slice(0, -2));
          this.lastInput.value = value;
        }
      }
    }

    if (type !== 'actionButton') {
      this.appendToCurrentOperand(value, type);
    }

    this.calcResult();
  }

  handleButtonClick(value: string | number, type: string) {
    switch (value) {
      case '=':
        if (!Number.isNaN(parseFloat(this.currentOperand))) {
          this.setPreviousOperand(this.currentOperand);
          this.setLastInput(this.currentOperand, 'digitButton');
          this.setCurrentOperand('');
        }

        break;

      case 'AC':
        this.setPreviousOperand('');
        this.setCurrentOperand('');
        break;

      case 'clear':
        this.deleateDigit();
        break;

      default:
        this.calculation(value.toString(), type);
        break;
    }
  }
}
