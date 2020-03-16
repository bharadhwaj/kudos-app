import { createSelector } from 'reselect';

const selectUserState = state => state.user;

export const isUserLoggedIn = () =>
  createSelector(selectUserState, userState => userState.isLoggedIn);

export const getAuthToken = () =>
  createSelector(
    selectUserState,
    userState =>
      userState.id &&
      userState.token &&
      'Bearer ' + userState.id + ',' + userState.token
  );

export const getCurrentUserId = () =>
  createSelector(selectUserState, userState => userState.id);

export const getCurrentUserInfo = () =>
  createSelector(selectUserState, userState => userState);
