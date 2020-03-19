import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Register from '../components/Register';

import {
  loadingAction,
  organisationAction,
  registerAction,
  toastAction,
} from '../actions';

import {
  loadingSelector,
  organisationSelector,
  userSelector,
} from '../selectors';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    const { isUserLoggedIn, redirectToPage } = this.props;

    if (isUserLoggedIn) {
      redirectToPage('/');
    }
  }

  componentDidMount() {
    const { getAllOrganisations } = this.props;
    getAllOrganisations();
  }

  render() {
    const { isGetOrganisationsLoading } = this.props;

    return (
      <>
        <Helmet>
          <title>Register</title>
        </Helmet>
        {!isGetOrganisationsLoading && <Register {...this.props} />}
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  redirectToPage: url => {
    return dispatch(push(url));
  },
  getAllOrganisations: () => {
    dispatch(loadingAction.startGetOrganisationsLoading());
    return dispatch(organisationAction.getAllOrganisations());
  },
  onRegisterSubmit: userData => {
    dispatch(toastAction.hideToast());
    dispatch(loadingAction.startRegisterLoading());
    return dispatch(registerAction.registerUser(userData));
  },
});

const mapStateToProps = createStructuredSelector({
  isUserLoggedIn: userSelector.isUserLoggedIn(),
  isGetOrganisationsLoading: loadingSelector.getOrganisationsLoadingState(),
  isRegisterSubmitLoading: loadingSelector.getRegisterLoadingState(),
  organisations: organisationSelector.getOrganisations(),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
