import { observer } from 'mobx-react';
import { v4 as uuid } from 'uuid';

import style from './Keyboard.module.scss';
import PercentIcon from '../../icons/PercentIcon';
import DivideIcon from '../../icons/DivideIcon';
import MultiplyIcon from '../../icons/MultiplyIcon';
import ClearIcon from '../../icons/ClearIcon';
import MinusIcon from '../../icons/MinusIcon';
import PlusIcon from '../../icons/PlusIcon';

interface Key {
  key: string | number | JSX.Element;
  isCountSpan?: number;
  isRound: boolean;
}

const keys: Key[] = [
  {
    key: 'AC',
    isRound: true,
  },
  {
    key: <PercentIcon />,
    isRound: true,
  },
  {
    key: <DivideIcon />,
    isRound: true,
  },
  {
    key: <MultiplyIcon />,
    isRound: true,
  },
  {
    key: 7,
    isRound: false,
  },
  {
    key: 8,
    isRound: false,
  },
  {
    key: 9,
    isRound: false,
  },
  {
    key: <MinusIcon />,
    isRound: true,
  },
  {
    key: 4,
    isRound: false,
  },
  {
    key: 5,
    isRound: false,
  },
  {
    key: 6,
    isRound: false,
  },
  {
    key: <PlusIcon />,
    isRound: true,
  },
  {
    key: 1,
    isRound: false,
  },
  {
    key: 2,
    isRound: false,
  },
  {
    key: 3,
    isRound: false,
  },
  {
    key: '=',
    isCountSpan: 2,
    isRound: false,
  },
  {
    key: '.',
    isRound: false,
  },
  {
    key: 0,
    isRound: false,
  },
  {
    key: <ClearIcon />,
    isRound: false,
  },
];

const Keyboard = () => {
  return (
    <div className={style.keyboardContainer}>
      <div className={style.keyboardGrid}>
        {keys.map((item) => (
          <button
            key={uuid()}
            className={`${style.button} ${
              item?.isCountSpan === 2 ? style.spanTwo : ''
            }
              ${item.isRound ? style.roundedButton : style.generalButton}`}
            type='button'
          >
            {item.key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default observer(Keyboard);
