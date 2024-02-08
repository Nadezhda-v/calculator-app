import { FC, ReactNode } from 'react';

import style from './Container.module.scss';

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => (
  <div className={style.container}>{children}</div>
);

export default Container;
