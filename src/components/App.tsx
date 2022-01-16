import React, { FC } from 'react';
import { ThemeProvider } from '@mui/system';
import { Route, Switch, HashRouter } from 'react-router-dom';

import { Home } from './pages/Home';
import { theme } from '../theme';
import { AppProvider } from '../context/AppProvider';
import { Header } from './shared/Header';
import { DataProvider } from '../context/DataProvider';
import { Stake } from './pages/Stake';
import { Lock } from './pages/Lock';
import { Container } from '@mui/material';

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
