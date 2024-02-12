import { FC } from 'react';

import Icon from './Icon';

const PlusIcon: FC = () => {
  return (
    <Icon>
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M10 1V19'
          stroke='#1E1E1E'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M1 10H19'
          stroke='#1E1E1E'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </Icon>
  );
};

export default PlusIcon;
