import React, { FC } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Route, Switch, HashRouter } from 'react-router-dom';

import { Home } from './pages/Home';
import { GlobalStyle, theme } from '../theme';
import { AppProvider } from '../context/AppProvider';
import { Header } from './shared/Header';
import { DataProvider } from '../context/DataProvider';
import { Stake } from './pages/Stake';
import { ModalProvider } from 'react-modal-hook';

const Container = styled.div`
  max-width: 800px;
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;

const Routes: FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/stake" component={Stake} />
    </Switch>
  );
};

export const Layout: FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Wrapper>
      <ModalProvider>
        <Header />
        <Container>{children}</Container>
      </ModalProvider>
    </Wrapper>
  </ThemeProvider>
);

const App: FC = () => {
  return (
    <HashRouter>
      <AppProvider>
        <DataProvider>
          <Layout>
            <Routes />
          </Layout>
        </DataProvider>
      </AppProvider>
    </HashRouter>
  );
};

export default App;
