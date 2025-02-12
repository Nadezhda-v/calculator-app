import { CalculatorService } from './CalculatorService';

describe('CalculatorService', () => {
  let calculatorService: CalculatorService;

  beforeEach(() => {
    calculatorService = new CalculatorService();
  });

  it('previous and current operands should initialize with empty', () => {
    expect(calculatorService.previousOperand).toBe('');
    expect(calculatorService.currentOperand).toBe('');
  });

  it('previous operand should set correct', () => {
    calculatorService.setPreviousOperand('123');
    expect(calculatorService.previousOperand).toBe('123');
  });

  it('current operand should set correct', () => {
    calculatorService.setCurrentOperand('456');
    expect(calculatorService.currentOperand).toBe('456');
  });

  it('current operand should set correct', () => {
    calculatorService.setCurrentOperand('456');
    expect(calculatorService.currentOperand).toBe('456');
  });

  it('previous value should set correct', () => {
    calculatorService.setLastInput('45%', 'digitButton');
    expect(calculatorService.lastInput).toStrictEqual({
      value: '45%',
      type: 'digitButton',
    });
  });

  it('last digit should delete from previousOperand', () => {
    calculatorService.previousOperand = '12345';
    calculatorService.lastInput = { value: '12345', type: 'digitButton' };
    calculatorService.deleteDigit();

    expect(calculatorService.previousOperand).toBe('1234');
    expect(calculatorService.lastInput.type).toBe('digitButton');
  });

  it('if the last value is an arithmetic operator it should be removed along with the space', () => {
    calculatorService.previousOperand = '123+';
    calculatorService.lastInput = { value: '+', type: 'operationButton' };
    calculatorService.deleteDigit();

    expect(calculatorService.previousOperand).toBe('123');
    expect(calculatorService.lastInput.type).toBe('digitButton');
  });

  it('should call calcResult after deleting digit', () => {
    const calcResultSpy = jest.spyOn(calculatorService, 'calcResult');

    calculatorService.deleteDigit();
    expect(calcResultSpy).toHaveBeenCalled();
  });

  describe('calcResult', () => {
    it('currentOperand should set to empty string if there are less than 3 operands', () => {
      calculatorService.previousOperand = '5+';
      calculatorService.calcResult();
      expect(calculatorService.currentOperand).toBe('');
    });

    it('previous result should display if last input was an arithmetic operator', () => {
      calculatorService.previousOperand = '1+2*';
      calculatorService.lastInput.type = 'operationButton';
      calculatorService.calcResult();

      expect(calculatorService.currentOperand).toBe('3');
    });

    it('should display error message if division by zero', () => {
      calculatorService.previousOperand = '5/0';
      calculatorService.calcResult();
      expect(calculatorService.currentOperand).toBe('На 0 делить нельзя');
    });

    it('calculate result should for valid expression', () => {
      calculatorService.previousOperand = '5+3*2';
      calculatorService.calcResult();
      expect(calculatorService.currentOperand).toBe('11');
    });

    it('should handle and display error for invalid expression', () => {
      calculatorService.previousOperand = '*5+1';
      calculatorService.calcResult();
      expect(calculatorService.currentOperand).toBe('Ошибка формата');
    });
  });

  describe('calculation', () => {
    it('if previousOperand is empty and the value is *, /, or % then previousOperand must be empty', () => {
      calculatorService.previousOperand = '';
      calculatorService.calculation('*', 'operationButton');
      expect(calculatorService.previousOperand).toBe('');
    });

    it('if lastInput type is operationButton and value is the same as last input should display early value', () => {
      calculatorService.previousOperand = '1+2*';
      calculatorService.currentOperand = '3';
      calculatorService.lastInput = { value: '*', type: 'operationButton' };
      calculatorService.calculation('*', 'operationButton');

      expect(calculatorService.previousOperand).toBe('1+2*');
      expect(calculatorService.currentOperand).toBe('3');
    });

    it('previousOperand should update correct when type is operationButton and value is not -, ., or %', () => {
      calculatorService.previousOperand = '5/';
      calculatorService.lastInput.type = 'operationButton';
      calculatorService.calculation('+', 'operationButton');
      expect(calculatorService.previousOperand).toBe('5+');
    });

    it('previousOperand should be updated correct if the last value is the arithmetic operand and the input value is minus', () => {
      calculatorService.previousOperand = '5/';
      calculatorService.lastInput.type = 'operationButton';
      calculatorService.calculation('-', 'operationButton');
      expect(calculatorService.previousOperand).toBe('5/-');
    });

    it('previousOperand should be updated correct if the last two operands are arithmetic', () => {
      calculatorService.previousOperand = '5/';
      calculatorService.lastInput.type = 'operationButton';
      calculatorService.calculation('*', 'operationButton');
      expect(calculatorService.previousOperand).toBe('5*');
    });

    it('should call appendToCurrentOperand method when type is not actionButton', () => {
      const appendToCurrentOperandSpy = jest.spyOn(
        calculatorService,
        'appendToCurrentOperand',
      );

      calculatorService.calculation('5', 'digitButton');
      expect(appendToCurrentOperandSpy).toHaveBeenCalledWith(
        '5',
        'digitButton',
      );
    });

    it('should call calcResult method', () => {
      const calcResultSpy = jest.spyOn(calculatorService, 'calcResult');

      calculatorService.calculation('+', 'operationButton');
      expect(calcResultSpy).toHaveBeenCalled();
    });
  });

  describe('handleButtonClick', () => {
    it('should set previous operand, current operand, and last input correct when value is "="', () => {
      calculatorService.previousOperand = '2+8';
      calculatorService.currentOperand = '10';
      calculatorService.handleButtonClick('=', 'actionButton');

      expect(calculatorService.previousOperand).toBe('10');
      expect(calculatorService.currentOperand).toBe('');
      expect(calculatorService.lastInput).toEqual({
        value: '10',
        type: 'digitButton',
      });
    });

    it('previous and current operand should set to empty when value is "AC"', () => {
      calculatorService.setPreviousOperand('5');
      calculatorService.setCurrentOperand('10');
      calculatorService.handleButtonClick('AC', 'actionButton');

      expect(calculatorService.previousOperand).toBe('');
      expect(calculatorService.currentOperand).toBe('');
    });

    it('should call deleateDigit when value is "clear"', () => {
      const deleteDigitSpy = jest.spyOn(calculatorService, 'deleteDigit');

      calculatorService.handleButtonClick('clear', 'actionButton');
      expect(deleteDigitSpy).toHaveBeenCalled();
    });

    it('should call calculation when value is not "AC", "=" or "clear"', () => {
      const calculationSpy = jest.spyOn(calculatorService, 'calculation');

      calculatorService.handleButtonClick('+', 'operationButton');
      expect(calculationSpy).toHaveBeenCalledWith('+', 'operationButton');
    });
  });
});
