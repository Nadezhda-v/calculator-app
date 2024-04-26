import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';

import Container from './ui/Container/Container';
import { Main } from './components/Main/Main';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Container>
        <Main />
      </Container>
    </BrowserRouter>
  );
};

export default observer(App);
