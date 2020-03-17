import { createSelector } from 'reselect';

const selectCurrentUserState = state => state.user.currentUser;
const selectState = state => state;

export const isUserLoggedIn = () =>
  createSelector(
    selectCurrentUserState,
    currentUserState => currentUserState.isLoggedIn
  );

export const getAuthToken = () =>
  createSelector(
    selectCurrentUserState,
    currentUserState =>
      currentUserState.id &&
      currentUserState.token &&
      'Bearer ' + currentUserState.id + ',' + currentUserState.token
  );

export const getCurrentUserId = () =>
  createSelector(
    selectCurrentUserState,
    currentUserState => currentUserState.id
  );

export const getCurrentUserOrganisationId = () =>
  createSelector(
    selectCurrentUserState,
    currentUserState => currentUserState.organisation.id
  );

export const getCurrentUserInfo = () =>
  createSelector(selectCurrentUserState, currentUserState => currentUserState);

export const getUsersToGiveKudos = () =>
  createSelector(selectState, state => {
    const kudosGivenUserIds = state.kudos.kudosGiven.map(
      kudos => kudos.receivedByUser.id
    );
    return state.user.users.filter(
      user => kudosGivenUserIds.indexOf(user.id) === -1
    );
  });
