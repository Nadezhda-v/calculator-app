import { observer } from 'mobx-react';

import style from './Output.module.scss';

const Output = () => {
  return (
    <div className={style.outputContainer}>
      <div className={style.previosOperand}>524.5*57</div>
      <div className={style.currentOperand}>5257</div>
    </div>
  );
};

export default observer(Output);
