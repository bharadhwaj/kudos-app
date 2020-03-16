import { createSelector } from 'reselect';

const selectLoadingState = state => state.loading;

export const getLoginLoadingState = () =>
  createSelector(
    selectLoadingState,
    loadingState => loadingState.isLoginSubmitLoading
  );
