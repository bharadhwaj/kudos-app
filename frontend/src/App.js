import React, { lazy, Suspense } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import history from './utils/history';
import reduxStore from './utils/store';
import CustomTheme from './utils/theme';

import IndexPage from './pages/Index.page';
import LoginPage from './pages/Login.page';

import Loading from './components/Loading';
import Toast from './components/Toast';

// Lazy Load
const NotFoundPage = lazy(() => import('./pages/NotFound.page'));
const RegisterPage = lazy(() => import('./pages/Register.page'));

const App = () => {
  return (
    <Provider store={reduxStore}>
      <Helmet
        titleTemplate="%s - Kudos App"
        defaultTitle="Kudos App - Employee Rating App"
      >
        <meta name="description" content="Kudos App - Employee Rating App" />
      </Helmet>
      <ConnectedRouter history={history}>
        <Toast />
        <ThemeProvider theme={CustomTheme}>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path="/" component={IndexPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Suspense>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
