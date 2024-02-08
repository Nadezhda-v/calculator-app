import { observer } from 'mobx-react';

import style from './Calculator.module.scss';
import Output from './Output/Output';
import Keyboard from './Keyboard/Keyboard';

const Calculator = () => {
  return (
    <div className={style.calculatorContainer}>
      <Output />
      <Keyboard />
    </div>
  );
};

export default observer(Calculator);
