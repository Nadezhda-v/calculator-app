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

  setLastInput(value: string | number, type: string) {
    this.lastInput = { value: value.toString(), type };
  }

  appendToCurrentOperand(value: string, type: string) {
    if (this.lastInput.value.includes('.') && value === '.') return;

    if (type === 'operationButton' && value !== '.') {
      this.setLastInput(value, type);
    }

    if (
      this.previousOperand === '' ||
      value === '.' ||
      this.lastInput.value.includes('.') ||
      (this.lastInput.type === 'digitButton' && type === 'digitButton')
    ) {
      this.previousOperand += value;
    } else {
      this.previousOperand += ` ${value}`;
    }

    this.lastInput.value = this.previousOperand.split(' ').pop() || '';
    this.setLastInput(this.lastInput.value, type);
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

    // Если меньше двух операндов
    if (operands.length < 3) {
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

  calculation(value: string, type: string) {
    if (
      this.previousOperand === '' &&
      (value === '*' || value === '/' || value === '%')
    )
      return;

    if (this.lastInput.type === 'operationButton') {
      if (this.lastInput.value === value) return;

      if (type === 'operationButton' && value !== '-' && value !== '.') {
        const elements = this.previousOperand.split(' ').slice(-2);
        const isLastTwoNumbers = elements.every(
          (element) => typeof element === 'number' && !Number.isNaN(element),
        );

        if (!isLastTwoNumbers) {
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
          this.previousOperand = this.currentOperand;
          this.currentOperand = '';
        }

        break;

      case 'AC':
        this.previousOperand = '';
        this.currentOperand = '';
        break;

      case 'clear':
        this.deleateDigit();
        break;

      default:
        this.calculation(value.toString(), type);
    }
  }
}
