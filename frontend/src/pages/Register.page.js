import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Register from '../components/Register';

import { loadingAction, loginAction, toastAction } from '../actions';
import { loadingSelector, userSelector } from '../selectors';

class RegisterPage extends Component {
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
        <Register {...this.props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
