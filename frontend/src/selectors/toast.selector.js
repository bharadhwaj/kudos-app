import { createSelector } from 'reselect';

const selectToastState = state => state.toast;

export const getToastState = () =>
  createSelector(selectToastState, toastState => toastState.show);

export const getToastMessage = () =>
  createSelector(selectToastState, toastState => toastState.message);

export const getToastVariant = () =>
  createSelector(selectToastState, toastState => toastState.variant);
