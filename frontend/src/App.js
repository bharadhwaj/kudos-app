import React from 'react';
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
import RegisterPage from './pages/Register.page';

import Toast from './components/Toast';

// import CommunityPage from './pages/Community.page';
// import LoginPage from './pages/Login.page';
// import PostPage from './pages/Post.page';
// import RewardPage from './pages/Reward.page';
// import SignUpPage from './pages/SignUp.page';

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
          <Switch>
            <Route exact path="/" component={IndexPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
          </Switch>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
