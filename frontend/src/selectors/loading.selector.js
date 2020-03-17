import { createSelector } from 'reselect';

const selectLoadingState = state => state.loading;

export const getLoginLoadingState = () =>
  createSelector(
    selectLoadingState,
    loadingState => loadingState.isLoginSubmitLoading
  );

export const getFetchKudosLoadingState = () =>
  createSelector(
    selectLoadingState,
    loadingState => loadingState.isFetchKudosLoading
  );

export const getUsersOfCurrenOrgLoadingState = () =>
  createSelector(
    selectLoadingState,
    loadingState => loadingState.isGetUsersOfCurrenOrgLoading
  );
