import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Grid from '@material-ui/core/Grid';

import GiveKudosList from '../components/GiveKudosList';
import GivenKudosList from '../components/GivenKudosList';
import KudosSummary from '../components/KudosSummary';
import Navbar from '../components/Navbar';
import ReceivedKudosList from '../components/ReceivedKudosList';

import {
  kudosAction,
  toastAction,
  userAction,
  loadingAction,
} from '../actions';
import { utils } from '../constants';
import { kudosSelector, userSelector } from '../selectors';

import { logoutUser } from '../utils/users';

class IndexPage extends Component {
  constructor(props) {
    super(props);

    const { isUserLoggedIn, redirectToPage } = this.props;

    if (!isUserLoggedIn) {
      redirectToPage('/login');
    }
  }

  componentDidMount() {
    const { fetchAllKudos, getUsersFromCurrentOrganisation } = this.props;
    fetchAllKudos();
    getUsersFromCurrentOrganisation();
  }

  render() {
    const {
      isUserLoggedIn,
      user,
      logout,
      availableUsers,
      kudosStartDate,
      kudosEndDate,
      givenKudosCount,
      receivedKudosCount,
      kudosGiven,
      kudosReceived,
      giveKudosToUser,
    } = this.props;

    const canGiveKudos = givenKudosCount < 3;

    return (
      <>
        <>{isUserLoggedIn && <Navbar user={user} logout={logout} />}</>
        <>
          <KudosSummary
            kudosStartDate={kudosStartDate}
            kudosEndDate={kudosEndDate}
            givenKudosCount={givenKudosCount}
            receivedKudosCount={receivedKudosCount}
          />
        </>
        <>
          <Grid container justify="center">
            <GiveKudosList
              availableUsers={availableUsers}
              canGiveKudos={canGiveKudos}
              giveKudosToUser={giveKudosToUser}
            />
            <GivenKudosList kudosGiven={kudosGiven} />
          </Grid>
        </>
        <>
          <Grid container justify="center">
            <ReceivedKudosList kudosReceived={kudosReceived} />
          </Grid>
        </>
      </>
    );
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
  fetchAllKudos: () => {
    dispatch(loadingAction.startFetchKudosLoading());
    return dispatch(kudosAction.fetchAllKudos());
  },
  getUsersFromCurrentOrganisation: () => {
    dispatch(loadingAction.startGetUsersOfCurrentOrgLoading());
    return dispatch(userAction.getUsersOfCurrentOrganisation());
  },
  giveKudosToUser: (receiverUserId, comments) => {
    comments = comments === '' ? null : comments;
    dispatch(loadingAction.startFetchKudosLoading());
    return dispatch(kudosAction.giveKudosToUser(receiverUserId, comments));
  },
});

const mapStateToProps = createStructuredSelector({
  isUserLoggedIn: userSelector.isUserLoggedIn(),
  user: userSelector.getCurrentUserInfo(),
  kudosStartDate: kudosSelector.getKudosStartDate(),
  kudosEndDate: kudosSelector.getKudosEndDate(),
  givenKudosCount: kudosSelector.getGivenKudosCount(),
  kudosGiven: kudosSelector.getGivenKudos(),
  receivedKudosCount: kudosSelector.getReceivedKudosCount(),
  kudosReceived: kudosSelector.getReceivedKudos(),
  availableUsers: userSelector.getUsersToGiveKudos(),
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
