import { FC, ReactNode } from 'react';
import cn from 'classnames';

interface IconProps {
  children: ReactNode;
  className?: string;
}

const Icon: FC<IconProps> = ({ children, className }) => {
  return (
    <span className={cn(className)} role='img'>
      {children}
    </span>
  );
};

export default Icon;
