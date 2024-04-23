import { observer } from 'mobx-react';
import { FC } from 'react';

import style from './Keyboard.module.scss';
import PercentIcon from '../../icons/PercentIcon';
import DivideIcon from '../../icons/DivideIcon';
import MultiplyIcon from '../../icons/MultiplyIcon';
import ClearIcon from '../../icons/ClearIcon';
import MinusIcon from '../../icons/MinusIcon';
import PlusIcon from '../../icons/PlusIcon';
import { CalculatorService } from '../CalculatorService';

enum TypeButton {
  operationButton = 'operationButton',
  digitButton = 'digitButton',
  actionButton = 'actionButton',
}

interface Key {
  key: string | number | JSX.Element;
  isCountSpan?: number;
  isRound: boolean;
  value: string | number;
  type: TypeButton;
}

interface KeyboardProps {
  service: CalculatorService;
}

const keys: Key[] = [
  {
    key: 'AC',
    isRound: true,
    value: 'AC',
    type: TypeButton.actionButton,
  },
  {
    key: <PercentIcon />,
    isRound: true,
    value: '%',
    type: TypeButton.operationButton,
  },
  {
    key: <DivideIcon />,
    isRound: true,
    value: '/',
    type: TypeButton.operationButton,
  },
  {
    key: <MultiplyIcon />,
    isRound: true,
    value: '*',
    type: TypeButton.operationButton,
  },
  {
    key: 7,
    isRound: false,
    value: 7,
    type: TypeButton.digitButton,
  },
  {
    key: 8,
    isRound: false,
    value: 8,
    type: TypeButton.digitButton,
  },
  {
    key: 9,
    isRound: false,
    value: 9,
    type: TypeButton.digitButton,
  },
  {
    key: <MinusIcon />,
    isRound: true,
    value: '-',
    type: TypeButton.operationButton,
  },
  {
    key: 4,
    isRound: false,
    value: 4,
    type: TypeButton.digitButton,
  },
  {
    key: 5,
    isRound: false,
    value: 5,
    type: TypeButton.digitButton,
  },
  {
    key: 6,
    isRound: false,
    value: 6,
    type: TypeButton.digitButton,
  },
  {
    key: <PlusIcon />,
    isRound: true,
    value: '+',
    type: TypeButton.operationButton,
  },
  {
    key: 1,
    isRound: false,
    value: 1,
    type: TypeButton.digitButton,
  },
  {
    key: 2,
    isRound: false,
    value: 2,
    type: TypeButton.digitButton,
  },
  {
    key: 3,
    isRound: false,
    value: 3,
    type: TypeButton.digitButton,
  },
  {
    key: '=',
    isCountSpan: 2,
    isRound: false,
    value: '=',
    type: TypeButton.actionButton,
  },
  {
    key: '.',
    isRound: false,
    value: '.',
    type: TypeButton.operationButton,
  },
  {
    key: 0,
    isRound: false,
    value: 0,
    type: TypeButton.digitButton,
  },
  {
    key: <ClearIcon />,
    isRound: false,
    value: 'clear',
    type: TypeButton.actionButton,
  },
];

const Keyboard: FC<KeyboardProps> = ({ service }: KeyboardProps) => {
  return (
    <div className={style.keyboardContainer}>
      <div className={style.keyboardGrid}>
        {keys.map((item) => (
          <button
            key={item.value}
            className={`${style.button} ${
              item?.isCountSpan === 2 ? style.spanTwo : ''
            }
              ${item.isRound ? style.roundedButton : style.generalButton}`}
            type='button'
            onClick={() => service.handleButtonClick(item.value, item.type)}
          >
            {item.key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default observer(Keyboard);
