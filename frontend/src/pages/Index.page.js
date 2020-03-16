import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import UserInfo from '../components/UserInfo';

import { toastAction, userAction } from '../actions';
import { utils } from '../constants';
import { userSelector } from '../selectors';

import { logoutUser } from '../utils/users';

class IndexPage extends Component {
  constructor(props) {
    super(props);

    const { isUserLoggedIn, redirectToPage } = this.props;

    if (!isUserLoggedIn) {
      redirectToPage('/login');
    }
  }

  render() {
    const { isUserLoggedIn, user, logout } = this.props;

    return <>{isUserLoggedIn && <UserInfo user={user} logout={logout} />}</>;
  }
}

const mapDispatchToProps = dispatch => ({
  redirectToPage: url => {
    return dispatch(push(url));
  },
  logout: () => {
    logoutUser();
    dispatch(
      toastAction.requestToShowToast(
        utils.MESSAGE_VARIANTS.INFO,
        'Logged out successfully.'
      )
    );
    dispatch(userAction.resetUserInfo());
    return dispatch(push('/login'));
  },
});

const mapStateToProps = createStructuredSelector({
  isUserLoggedIn: userSelector.isUserLoggedIn(),
  user: userSelector.getCurrentUserInfo(),
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
