import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Login from '../components/Login';

import { loadingAction, loginAction, toastAction } from '../actions';
import { loadingSelector, userSelector } from '../selectors';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    const { isUserLoggedIn, redirectToPage } = this.props;

    if (isUserLoggedIn) {
      redirectToPage('/');
    }
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <Login {...this.props} />
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  redirectToPage: url => {
    return dispatch(push(url));
  },
  onLoginSubmit: (email, password) => {
    dispatch(toastAction.hideToast());
    dispatch(loadingAction.startLoginLoading());
    return dispatch(loginAction.submitForLogin(email, password));
  },
});

const mapStateToProps = createStructuredSelector({
  isUserLoggedIn: userSelector.isUserLoggedIn(),
  isLoginSubmitLoading: loadingSelector.getLoginLoadingState(),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
