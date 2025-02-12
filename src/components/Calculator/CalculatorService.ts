import { action, makeObservable, observable } from 'mobx';
import * as math from 'mathjs';

export class CalculatorService {
  constructor() {
    makeObservable(this, {
      previousOperand: observable,
      currentOperand: observable,
      setPreviousOperand: action,
      setCurrentOperand: action,
      deleteDigit: action,
      calcResult: action,
      appendToCurrentOperand: action,
    });
  }

  previousOperand = '';

  currentOperand = '';

  lastInput = { value: '', type: '' };

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

    this.setPreviousOperand(this.previousOperand + value);
    const lastValue = this.previousOperand.split('').pop() || '';

    if (
      !this.lastInput.value.includes('%') &&
      !this.lastInput.value.includes('.')
    ) {
      this.setLastInput(lastValue, type);
    }
  }

  deleteDigit() {
    const lastValue = this.previousOperand.slice(-1);

    this.lastInput.value = lastValue;
    this.previousOperand = this.previousOperand.slice(0, -1);

    this.lastInput.type = Number.isNaN(
      parseFloat(this.previousOperand.slice(-1)),
    )
      ? 'operationButton'
      : 'digitButton';

    this.calcResult();
  }

  calcResult() {
    const isLastTwoOperator = this.isLastTwoOperators();
    const lastTwoValues = this.previousOperand.slice(-2);

    if (
      isLastTwoOperator &&
      (this.lastInput.value !== '-' || lastTwoValues === '+-')
    ) {
      this.setPreviousOperand(
        this.previousOperand.slice(0, -2) + this.lastInput.value,
      );
    }

    if (this.previousOperand.length < 3) {
      this.currentOperand = '';

      return;
    }

    // Если последнее значение оператор, удаляем все операторы для корректного вычисления
    if (this.lastInput.type === 'operationButton') {
      const cleanedOperand = this.previousOperand.replace(/[+\-*/.%]+$/, '');

      this.currentOperand = math.evaluate(cleanedOperand).toString();

      return;
    }

    const operatorDivision = this.previousOperand.split('').lastIndexOf('/');

    // Проверяем, если есть в выражении оператор '/' и следующий за ним операнд равен нулю
    if (
      operatorDivision !== -1 &&
      parseFloat(this.previousOperand[operatorDivision + 1]) === 0
    ) {
      this.currentOperand = 'На 0 делить нельзя';

      return;
    }

    try {
      this.currentOperand = math.evaluate(this.previousOperand).toString();
    } catch (error) {
      this.currentOperand = 'Ошибка формата';
    }
  }

  // Проверка являются ли два последних значения арифметическими операторами
  isLastTwoOperators(): boolean {
    const operators = ['+', '-', '*', '/'];
    const lastTwoValues = this.previousOperand.slice(-2);

    if (lastTwoValues.length < 2) return false;

    return lastTwoValues.split('').every((value) => operators.includes(value));
  }

  calculation(value: string, type: string) {
    const operators = ['%', '*', '/'];

    if (
      (this.previousOperand.length === 0 && operators.includes(value)) ||
      (this.lastInput.type === 'operationButton' &&
        this.lastInput.value === value)
    )
      return;

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
        this.deleteDigit();
        break;

      default:
        this.calculation(value.toString(), type);
        break;
    }
  }
}
