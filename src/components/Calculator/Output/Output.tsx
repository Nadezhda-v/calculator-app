import { observer } from 'mobx-react';

import style from './Output.module.scss';

const Output = () => {
  console.log('gh');

  return (
    <div className={style.outputContainer}>
      <div className={style.previosOperand} />
      <div className={style.currentOperand} />
    </div>
  );
};

export default observer(Output);
