import { FC } from 'react';

import Icon from './Icon';

const DivideIcon: FC = () => {
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
          d='M10 5C11.1046 5 12 4.10457 12 3C12 1.89543 11.1046 1 10 1C8.89543 1 8 1.89543 8 3C8 4.10457 8.89543 5 10 5Z'
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
        <path
          d='M10 19C11.1046 19 12 18.1046 12 17C12 15.8954 11.1046 15 10 15C8.89543 15 8 15.8954 8 17C8 18.1046 8.89543 19 10 19Z'
          stroke='#1E1E1E'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </Icon>
  );
};

export default DivideIcon;
