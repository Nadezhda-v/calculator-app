import { FC } from 'react';

import Icon from './Icon';

const MinusIcon: FC = () => {
  return (
    <Icon>
      <svg
        width='20'
        height='10'
        viewBox='0 0 20 10'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M1 1H19'
          stroke='#1E1E1E'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </Icon>
  );
};

export default MinusIcon;
