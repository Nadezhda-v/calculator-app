import { observer } from 'mobx-react';

import style from './Calculator.module.scss';
import Output from './Output/Output';
import Keyboard from './Keyboard/Keyboard';
import { CalculatorService } from './CalculatorService';

const SERVICE = new CalculatorService();

const Calculator = () => {
  return (
    <div className={style.calculatorContainer}>
      <Output service={SERVICE} />
      <Keyboard service={SERVICE} />
    </div>
  );
};

export default observer(Calculator);
