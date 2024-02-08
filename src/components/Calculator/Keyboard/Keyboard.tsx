import { observer } from 'mobx-react';
import { v4 as uuid } from 'uuid';

import style from './Keyboard.module.scss';
import PercentIcon from '../../icons/PercentIcon';
import DivideIcon from '../../icons/DivideIcon';
import MultiplyIcon from '../../icons/MultiplyIcon';
import ClearIcon from '../../icons/ClearIcon';

interface Key {
  key: string | number | JSX.Element;
}

const keys: Key[] = [
  {
    key: 'AC',
  },
  {
    key: <PercentIcon />,
  },
  {
    key: <DivideIcon />,
  },
  {
    key: <MultiplyIcon />,
  },
  {
    key: 7,
  },
  {
    key: 8,
  },
  {
    key: 9,
  },
  {
    key: '-',
  },
  {
    key: 4,
  },
  {
    key: 5,
  },
  {
    key: 6,
  },
  {
    key: '+',
  },
  {
    key: 1,
  },
  {
    key: 2,
  },
  {
    key: 3,
  },
  {
    key: '=',
  },
  {
    key: '.',
  },
  {
    key: 0,
  },
  {
    key: <ClearIcon />,
  },
];

const Keyboard = () => {
  return (
    <div className={style.keyboardContainer}>
      {keys &&
        keys.map((item) => (
          <button key={uuid()} type='button'>
            {item.key}
          </button>
        ))}
    </div>
  );
};

export default observer(Keyboard);
