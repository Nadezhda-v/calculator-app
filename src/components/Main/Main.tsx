import { Route, Routes } from 'react-router-dom';

import style from './Main.module.scss';
import Calculator from '../Calculator/Calculator';

export const Main = () => {
  return (
    <main className={style.main}>
      <Routes>
        <Route path='/' element={<Calculator />} />
      </Routes>
    </main>
  );
};
