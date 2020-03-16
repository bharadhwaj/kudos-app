import { createSelector } from 'reselect';

const selectLoginState = state => state.login;

export const getLoginEmail = () =>
  createSelector(selectLoginState, loginState => loginState.email);

export const getLoginPassword = () =>
  createSelector(selectLoginState, loginState => loginState.password);
