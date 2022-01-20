import React, { FC } from 'react';
import { ThemeProvider } from '@mui/system';
import { Route, Switch, HashRouter } from 'react-router-dom';
import './App.css';

import { Home } from './pages/Home';
import { theme } from '../theme';
import { AppProvider } from '../context/AppProvider';
import { Header } from './shared/Header';
import { Footer } from './shared/Footer';
import { DataProvider } from '../context/DataProvider';
import { Stake } from './pages/Stake';
import { Lock } from './pages/Lock';
import { Container } from '@mui/material';

import { ContractProvider } from '../context/ContractProvider';

const Routes: FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/stake" component={Stake} />
      <Route exact path="/lock" component={Lock} />
    </Switch>
  );
};

export const Layout: FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Container maxWidth="md">
      <Header />
      {children}
    </Container>
    <Footer />
  </ThemeProvider>
);

const App: FC = () => {
  return (
    <HashRouter>
      <AppProvider>
        <ContractProvider>
          <DataProvider>
            <Layout>
              <Routes />
            </Layout>
          </DataProvider>
        </ContractProvider>
      </AppProvider>
    </HashRouter>
  );
};

export default App;
