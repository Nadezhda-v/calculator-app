import { observer } from 'mobx-react';

import style from './Output.module.scss';
import { CalculatorService } from '../CalculatorService';

interface OutputProps {
  service: CalculatorService;
}

const Output = ({ service }: OutputProps) => {
  const { previousOperand, currentOperand } = service;

  return (
    <div className={style.outputContainer}>
      <div className={style.previousOperand}>{previousOperand}</div>
      <div className={style.currentOperand}>{currentOperand}</div>
    </div>
  );
};

export default observer(Output);
