import { FC } from 'react';

import Icon from './Icon';

const MultiplyIcon: FC = () => {
  return (
    <Icon>
      <svg
        width='18'
        height='18'
        viewBox='0 0 18 18'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M17 1L1 17'
          stroke='#1E1E1E'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M1 1L17 17'
          stroke='#1E1E1E'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </Icon>
  );
};

export default MultiplyIcon;
