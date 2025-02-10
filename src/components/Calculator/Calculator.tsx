import { observer } from 'mobx-react';

import style from './Calculator.module.scss';
import Output from './Output/Output';
import Keyboard from './Keyboard/Keyboard';
import { CalculatorService } from './CalculatorService';

const CALC_SERVICE = new CalculatorService();

const Calculator = () => {
  return (
    <div className={style.container}>
      <Output service={CALC_SERVICE} />
      <Keyboard service={CALC_SERVICE} />
    </div>
  );
};

export default observer(Calculator);
